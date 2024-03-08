export const checkEmptyFieldsAndEnableSubmitButton = () => {
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
};
