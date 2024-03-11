import { editTodo } from "./api/todos/editTodo.js";
import { getTodo } from "./api/todos/getTodo.js";
import { displayErrorNotification } from "./core/notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "./core/notifications/displaySuccessfulNotificaiton.js";
import { appendTodoToTableBody } from "./core/todos/appendTodoToTableBody.js";
import { handleDeleteTodoClick } from "./core/todos/handleDeleteTodoClick.js";
import { handleEditTodoButtonClick } from "./core/todos/handleEditTodoButtonClick.js";
import { handleSubmitTodoClick } from "./core/todos/handleSubmitTodoClick.js";
import { isFormSubmittable } from "./core/todos/isFormSubmittable.js";
import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  // Render all todos from the DB upon page load
  renderTodos();

  // Check if the form in the "Create Todo" modal is valid and if so, enable the "Create" button
  $("#create-todo-description-input, #create-todo-title-input").on(
    "keyup",
    () =>
      isFormSubmittable(
        ["#create-todo-description-input", "#create-todo-title-input"],
        "#submit-create-todo-btn"
      )
  );

  // Check if the form in the "Edit Todo" modal is valid and if so, enable the "Save" button
  $("#edit-todo-title-input, #edit-todo-description-input").on("keyup", () =>
    isFormSubmittable(
      ["#edit-todo-title-input", "#edit-todo-description-input"],
      "#submit-edit-todo-btn"
    )
  );

  // Handle the "Create" (submit) button click in the "Create Todo" modal
  $("#submit-create-todo-btn").on("click", handleSubmitTodoClick);

  $("#table-body").on("click", "#delete-todo-button", handleDeleteTodoClick);

  $("#table-body").on("click", "#edit-todo-button", handleEditTodoButtonClick);

  $("#submit-edit-todo-btn").on("click", async () => {
    const editTodoTitleInput = $("#edit-todo-title-input");

    const editTodoDescriptionInput = $("#edit-todo-description-input");

    const todoId = sessionStorage.getItem("editTodoId");

    if (!todoId) {
      throw new Error("The 'todoId' is missing in the storage");
    }

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
