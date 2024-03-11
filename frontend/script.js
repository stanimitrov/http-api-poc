import { handleEditTodoButtonClick } from "./core/todos/edit-todo/handleEditTodoButtonClick.js";
import { handleSubmitEditedTodoButtonClick } from "./core/todos/edit-todo/handleSubmitEditedTodoButtonClick.js";
import { handleDeleteTodoClick } from "./core/todos/handleDeleteTodoClick.js";
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

  $("#submit-edit-todo-btn").on("click", handleSubmitEditedTodoButtonClick);
});
