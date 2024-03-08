import { getAllTodos } from "../../api/todos/getAllTodos.js";
import { getTodo } from "../../api/todos/getTodo.js";
import { appendTodoToTableBody } from "./appendTodoToTableBody.js";

export function renderTodos() {
  organizeTodosInArray().then((todos) => todos.map(appendTodoToTableBody));
}

async function organizeTodosInArray() {
  try {
    const { result: idsOfTodos } = await getAllTodos();

    const todosPromiseMap = idsOfTodos.map(async (id) => {
      return await getTodo(id);
    });

    return (await Promise.all(todosPromiseMap)).map((v) => v.result);
  } catch (err) {
    console.error("Something went wrong while organizing the todos. " + err);
  }
}
