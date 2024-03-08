import { createTodo } from "../../api/todos/createTodo.js";
import { getTodo } from "../../api/todos/getTodo.js";
import { appendTodoToTableBody } from "./appendTodoToTableBody.js";

export const handleSubmitTodoClick = async () => {
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

      const createdTodoId = (await res.json())?.result.id;
      const newlyCreatedTodo = (await getTodo(createdTodoId))?.result;

      appendTodoToTableBody(newlyCreatedTodo);
    } catch (err) {
      console.error(err);
    }
  });
};
