import { checkEmptyFieldsAndEnableSubmitButton } from "./core/todos/checkEmptyFieldsAndEnableSubmitButton.js";
import { handleCreateTodoClick } from "./core/todos/handleCreateTodoClick.js";
import { handleDeleteTodoClick } from "./core/todos/handleDeleteTodoClick.js";
import { handleSubmitTodoClick } from "./core/todos/handleSubmitTodoClick.js";
import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  // Render all todos from the DB upon page load
  renderTodos();

  // Display the modal upon "Create Todo" button click
  $("#create-todo-btn").on("click", handleCreateTodoClick);

  // Enable the "Create" button in the "Create Todo" modal
  $("#todo-description-input, #todo-title-input").on(
    "keyup",
    checkEmptyFieldsAndEnableSubmitButton
  );

  // Handle the "Create" (submit) button click in the "Create Todo" modal
  $("#submit-create-todo-btn").on("click", handleSubmitTodoClick);

  $("#table-body").on("click", "#delete-todo-button", handleDeleteTodoClick);
});
