const KEY = "editTodoId";

export const setEditTodoIdInSessionStorage = (todoId) => {
  sessionStorage.setItem(KEY, todoId);
};

export const getEditTodoIdFromSessionStorage = () => {
  return sessionStorage.getItem(KEY);
};
