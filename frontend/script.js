import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  renderTodos();

  $(".create-todo-btn").on("click", () => {
    $("#create-todo-modal").show();
  });
});
