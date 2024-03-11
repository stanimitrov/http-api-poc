import { deleteTodo } from "../../api/todos/deleteTodo.js";
import { displayErrorNotification } from "../notifications/displayErrorNotification.js";
import { displaySuccessfulNotification } from "../notifications/displaySuccessfulNotificaiton.js";

export const handleDeleteTodoClick = async (e) => {
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
      const errorMessage = (await res.json()).error;

      displayErrorNotification(errorMessage);

      return;
    }

    todoRow.remove();

    displaySuccessfulNotification("The todo was deleted successfully!");
  } catch (err) {
    displayErrorNotification("Something went wrong while deleting the todo...");
  }
};
