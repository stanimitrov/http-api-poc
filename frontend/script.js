import { editTodo } from "./api/todos/editTodo.js";
import { getTodo } from "./api/todos/getTodo.js";
import { displayErrorNotification } from "./core/notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "./core/notifications/displaySuccessfulNotificaiton.js";
import { appendTodoToTableBody } from "./core/todos/appendTodoToTableBody.js";
import { handleDeleteTodoClick } from "./core/todos/handleDeleteTodoClick.js";
import { handleSubmitTodoClick } from "./core/todos/handleSubmitTodoClick.js";
import { isFormSubmittable } from "./core/todos/isFormSubmittable.js";
import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  // Render all todos from the DB upon page load
  renderTodos();

  // Enable the "Create" button in the "Create Todo" modal
  $("#create-todo-description-input, #create-todo-title-input").on(
    "keyup",
    () =>
      isFormSubmittable(
        ["#create-todo-description-input", "#create-todo-title-input"],
        "#submit-create-todo-btn"
      )
  );

  // Enable the "Save" button in the "Edit Todo" modal
  $("#edit-todo-title-input, #edit-todo-description-input").on("keyup", () =>
    isFormSubmittable(
      ["#edit-todo-title-input", "#edit-todo-description-input"],
      "#submit-edit-todo-btn"
    )
  );

  // Handle the "Create" (submit) button click in the "Create Todo" modal
  $("#submit-create-todo-btn").on("click", handleSubmitTodoClick);

  $("#table-body").on("click", "#delete-todo-button", handleDeleteTodoClick);

  $("#table-body").on("click", "#edit-todo-button", async (e) => {
    const todoRow = $(e.target).closest("tr");

    if (!todoRow) {
      return;
    }

    const todoId = todoRow.attr("key");

    if (!todoId) {
      return;
    }

    const url = document.location.href;
    const isTodoIdInUrl =
      url.split("/").filter((e) => e.match("todoId")).length > 0;

    if (!isTodoIdInUrl) {
      history.replaceState({}, null, url + "todos?todoId=" + todoId);
    } else {
      const newUrl = url
        .split("/")
        .map((e) => {
          if (e.includes("todos?todoId=")) {
            return e.slice(0, -2) + todoId;
          }

          return e;
        })
        .join("/");

      history.replaceState({}, null, newUrl);
    }
  });

  $("#submit-edit-todo-btn").on("click", async () => {
    const editTodoTitleInput = $("#edit-todo-title-input");

    const editTodoDescriptionInput = $("#edit-todo-description-input");

    const todoId = document.location.href
      .split("/")
      .filter((e) => e.includes("todos?todoId="))[0]
      .slice(-2);

    try {
      const res = await editTodo(
        todoId,
        editTodoTitleInput.val(),
        editTodoDescriptionInput.val()
      );

      if (!res.ok) {
        const errorMessage = (await res.json()).error;
        $("<span>")
          .text(errorMessage)
          .attr("id", "edit-todo-error-message")
          .addClass("text-danger mt-2")
          .appendTo("#edit-todo-modal-body");

        return;
      }

      // Hide the modal from the UI if the request was successful
      $(".modal-backdrop").remove();
      $("#edit-todo-modal").toggle();
      $("body").addClass("overflow-auto");

      // Clean the input fields
      editTodoTitleInput.val("");
      editTodoDescriptionInput.val("");

      const editedTodo = (await getTodo(todoId))?.result;

      // Removes the row with the old values
      $(`tr[key=${todoId}]`).remove();

      // Appends a new row with the new values
      !!editedTodo && appendTodoToTableBody(editedTodo);

      displaySuccessfulNotification("You have successfully edited the todo!");
    } catch (err) {
      displayErrorNotification("Something went wrong while editing the todo");
    }
  });
});
