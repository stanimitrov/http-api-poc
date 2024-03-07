const getAllTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/todos");

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTodo = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`);

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const organizeTodosInArray = async () => {
  const { result: idsOfTodos } = await getAllTodos();

  const todosPromiseMap = idsOfTodos.map(async (id) => {
    return await getTodo(id);
  });

  return (await Promise.all(todosPromiseMap)).map((v) => v.result);
};

$(() => {
  organizeTodosInArray().then((res) => console.log(res));
});
