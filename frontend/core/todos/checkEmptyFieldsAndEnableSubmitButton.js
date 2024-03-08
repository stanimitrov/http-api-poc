export const checkEmptyFieldsAndEnableSubmitButton = () => {
  const todoTitleInput = $(".todo-title-input").val();
  const todoDescriptionInput = $(".todo-description-input").val();

  const editTitleInput = $("#edit-todo-title-input").val();
  const editDescriptionInput = $("#edit-todo-description-input").val();

  if (
    typeof todoTitleInput !== "object" &&
    typeof todoDescriptionInput !== "object"
  ) {
    if (todoTitleInput && todoDescriptionInput) {
      $("#submit-create-todo-btn").removeAttr("disabled");
    }
  }

  if (
    typeof editTitleInput !== "object" &&
    typeof editDescriptionInput !== "object"
  ) {
    if (editTitleInput && editDescriptionInput) {
      $("#submit-edit-todo-btn").removeAttr("disabled");
    }
  }
};
