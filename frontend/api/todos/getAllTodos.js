import { endpoints } from "../endpoints.js";

export async function getAllTodos() {
  try {
    const response = await fetch(endpoints.todos.getAll);

    return response.json();
  } catch (err) {
    console.error("Something went wrong while fetching the todos. " + err);
  }
}
