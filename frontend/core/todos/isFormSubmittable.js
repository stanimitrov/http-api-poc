export const isFormSubmittable = (fieldsIds = [], buttonId) => {
  const isFormValid = validateFields(fieldsIds);

  if (!isFormValid) {
    return;
  } else {
    removeDisabledButtonAttribute(buttonId);
  }
};

const validateFields = (fieldsIds = []) => {
  return fieldsIds.every((f) => {
    const field = f.indexOf("#") === 0 ? f : `#${f}`;

    const fieldValue = $(field).val();

    return typeof fieldValue !== "object" && !!fieldValue;
  });
};

const removeDisabledButtonAttribute = (buttonId) => {
  const button = buttonId.indexOf("#") === 0 ? buttonId : `#${buttonId}`;

  $(button).removeAttr("disabled");
};
