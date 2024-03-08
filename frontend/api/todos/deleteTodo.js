import { endpoints } from "../endpoints.js";

export const deleteTodo = async (id) =>
  await fetch(endpoints.todos.delete(id), {
    method: "DELETE",
  });
