import { createTodo } from "./api/todos/createTodo.js";
import { renderTodos } from "./core/todos/renderTodos.js";

$(() => {
  // Render all todos from the DB upon page load
  renderTodos();

  // Display the modal upon "Create Todo" button click
  $("#create-todo-btn").on("click", () => {
    $("#create-todo-modal").show();
  });

  // Enable the "Create" button in the "Create Todo" modal
  $("#todo-description-input, #todo-title-input").on("keyup", () => {
    const todoTitleInput = $("#todo-title-input").val();
    const todoDescriptionInput = $("#todo-description-input").val();

    if (
      typeof todoTitleInput !== "object" &&
      typeof todoDescriptionInput !== "object"
    ) {
      if (todoTitleInput && todoDescriptionInput) {
        $("#submit-create-todo-btn").removeAttr("disabled");
      }
    }
  });

  // Handle the "Create" (submit) button click in the "Create Todo" modal
  $("#submit-create-todo-btn").on("click", async () => {
    const todoTitleInput = $("#todo-title-input");
    const todoDescriptionInput = $("#todo-description-input");

    try {
      const res = await createTodo(
        todoTitleInput.val(),
        todoDescriptionInput.val()
      );

      if (!res.ok) {
        $("<span>")
          .text(
            "Ooops! A todo with this title and/or description already exists "
          )
          .attr("id", "create-todo-error-message")
          .addClass("text-danger mt-2")
          .appendTo("#create-todo-modal-body");

        return;
      }

      // Hide the modal from the UI if the request was successful
      $(".modal-backdrop").remove();
      $("#create-todo-modal").toggle();
      $("body").addClass("overflow-auto");

      // Clean the input fields in the modal
      todoTitleInput.val("");
      todoDescriptionInput.val("");

      // Remove the error message from the modal if it was there
      $("#create-todo-error-message").remove();
    } catch (err) {
      console.error(err);
    }
  });
});
