import { editTodo } from "../../../api/todos/editTodo.js";
import { getTodo } from "../../../api/todos/getTodo.js";
import { displayErrorNotification } from "../../notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "../../notifications/displaySuccessfulNotificaiton.js";
import { appendTodoToTableBody } from "../appendTodoToTableBody.js";
import { getEditTodoIdFromSessionStorage } from "./editTodoIdGetterAndSetter.js";

export const handleSubmitEditedTodoButtonClick = async () => {
  const editTodoTitleInput = $("#edit-todo-title-input");

  const editTodoDescriptionInput = $("#edit-todo-description-input");

  const todoId = getEditTodoIdFromSessionStorage();

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
};
