$(() => {
  renderTodos();
});

async function getAllTodos() {
  try {
    const response = await fetch("http://localhost:3000/todos");

    return response.json();
  } catch (err) {
    console.error("Something went wrong while fetching the todos. " + err);
  }
}

async function getTodo(id) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`);

    return response.json();
  } catch (err) {
    console.error("Something went wrong while fetching the todo. " + err);
  }
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

function renderTodos() {
  organizeTodosInArray().then((todos) => {
    todos.map((t) => {
      $("#table-body").append(
        $("<tr>")
          .attr("cellpadding", "6")
          .append(
            $("<th>")
              .attr("scope", "row")
              .attr("class", "align-middle")
              .text(t.id)
          )
          .append($("<td>").attr("class", "align-middle").text(t.title))
          .append($("<td>").attr("class", "align-middle").text(t.description))
          .append(
            $("<td>").append(
              $("<div>")
                .attr("class", "d-flex gap-2")
                .append(
                  $("<button>")
                    .attr("id", "edit-todo-button")
                    .attr("type", "button")
                    .attr("class", "btn btn-primary")
                    .text("Edit")
                )
                .append(
                  $("<button>")
                    .attr("id", "delete-todo-button")
                    .attr("type", "button")
                    .attr("class", "btn btn-danger")
                    .text("Delete")
                )
            )
          )
      );
    });
  });
}
