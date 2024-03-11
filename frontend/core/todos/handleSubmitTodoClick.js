import { createTodo } from "../../api/todos/createTodo.js";
import { getTodo } from "../../api/todos/getTodo.js";
import { displayErrorNotification } from "../notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "../notifications/displaySuccessfulNotificaiton.js";
import { appendTodoToTableBody } from "./appendTodoToTableBody.js";

export const handleSubmitTodoClick = async () => {
  const todoTitleInput = $("#create-todo-title-input");
  const todoDescriptionInput = $("#create-todo-description-input");

  try {
    const res = await createTodo(
      todoTitleInput.val(),
      todoDescriptionInput.val()
    );

    if (!res.ok) {
      const errorMessage = (await res.json()).error;
      $("<span>")
        .text(errorMessage)
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
    const newlyCreatedTodo = (await getTodo(createdTodoId || ""))?.result;

    !!newlyCreatedTodo && appendTodoToTableBody(newlyCreatedTodo);

    displaySuccessfulNotification("You have successfully created a new todo!");
  } catch (err) {
    displayErrorNotification(
      "Something went wrong while trying to create the todo..."
    );
  }
};
