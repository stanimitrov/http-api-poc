import { deleteTodo } from "./api/todos/deleteTodo.js";
import { displayErrorNotification } from "./core/notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "./core/notifications/displaySuccessfulNotificaiton.js";
import { checkEmptyFieldsAndEnableSubmitButton } from "./core/todos/checkEmptyFieldsAndEnableSubmitButton.js";
import { handleCreateTodoClick } from "./core/todos/handleCreateTodoClick.js";
import { handleSubmitTodoClick } from "./core/todos/handleSubmitTodoClick.js";
import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  // Render all todos from the DB upon page load
  renderTodos();

  // Display the modal upon "Create Todo" button click
  handleCreateTodoClick();

  // Enable the "Create" button in the "Create Todo" modal
  checkEmptyFieldsAndEnableSubmitButton();

  // Handle the "Create" (submit) button click in the "Create Todo" modal
  handleSubmitTodoClick();

  $("#table-body").on("click", "#delete-todo-button", async (e) => {
    const todoRow = $(e.target).closest("tr");

    if (!todoRow) {
      return;
    }

    const todoId = todoRow.attr("key");

    if (!todoId) {
      return;
    }

    try {
      const res = await deleteTodo(todoId);

      if (!res.ok) {
        displayErrorNotification("The todo was not deleted...");

        return;
      }

      todoRow.remove();

      displaySuccessfulNotification("The todo was deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  });
});
