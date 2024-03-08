import { endpoints } from "../endpoints.js";

export const createTodo = async (title, description) =>
  await fetch(endpoints.todos.create, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
