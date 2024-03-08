export const checkEmptyFieldsAndEnableSubmitButton = () => {
  $("#todo-description-input, #todo-title-input").on("keyup", () => {
    const todoTitleInput = $("#todo-title-input").val();
    const todoDescriptionInput = $("#todo-description-input").val();

    if (
      typeof todoTitleInput !== "object" &&
      typeof todoDescriptionInput !== "object"
    ) {
      if (todoTitleInput && todoDescriptionInput) {
        $("#submit-create-todo-btn").removeAttr("disabled");
      }
    }
  });
};
