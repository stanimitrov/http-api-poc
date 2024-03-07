export const endpoints = {
  todos: {
    getAll: "http://localhost:3000/todos",
    getOne: (id) => `http://localhost:3000/todos/${id}`,
    create: "http://localhost:3000/todos",
  },
};
