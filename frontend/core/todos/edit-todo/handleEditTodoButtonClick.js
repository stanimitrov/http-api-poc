import { setEditTodoIdInSessionStorage } from "./editTodoIdGetterAndSetter.js";

export const handleEditTodoButtonClick = (e) => {
  const todoRow = $(e.target).closest("tr");

  if (!todoRow) {
    return;
  }

  const todoId = todoRow.attr("key");

  if (!todoId) {
    return;
  }

  setEditTodoIdInSessionStorage(todoId);
};
