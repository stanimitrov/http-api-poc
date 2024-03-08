export const appendTodoToTableBody = (todo) => {
  $("#table-body").append(
    $("<tr>")
      .attr("cellpadding", "6")
      .attr("key", todo.id)
      .append(
        $("<th>")
          .attr("scope", "row")
          .attr("class", "align-middle")
          .text(todo.id)
      )
      .append($("<td>").attr("class", "align-middle").text(todo.title))
      .append($("<td>").attr("class", "align-middle").text(todo.description))
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
};
