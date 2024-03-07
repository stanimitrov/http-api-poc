import { endpoints } from "../endpoints";

export async function getTodo(id) {
  try {
    const response = await fetch(endpoints.todos.getOne(id));

    return response.json();
  } catch (err) {
    console.error("Something went wrong while fetching the todo. " + err);
  }
}
