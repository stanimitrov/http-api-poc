import { endpoints } from "../endpoints.js";

export const editTodo = async (id, title, description) =>
  await fetch(endpoints.todos.edit(id), {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
