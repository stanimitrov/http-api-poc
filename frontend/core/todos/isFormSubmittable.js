export const isFormSubmittable = (fieldsIds = [], buttonId) => {
  const isFormValid = validateFields(fieldsIds);

  if (!isFormValid) {
    addDisabledButtonAttribute(buttonId);
  } else {
    removeDisabledButtonAttribute(buttonId);
  }
};

const formatId = (id) => {
  return id.startsWith("#") ? id : `#${id}`;
};

const validateFields = (fieldsIds = []) => {
  return fieldsIds.every((f) => {
    const field = formatId(f);

    const fieldValue = $(field).val();

    return typeof fieldValue !== "object" && !!fieldValue;
  });
};

const removeDisabledButtonAttribute = (buttonId) => {
  const button = formatId(buttonId);

  $(button).removeAttr("disabled");
};

const addDisabledButtonAttribute = (buttonId) => {
  const button = formatId(buttonId);

  $(button).attr("disabled", "true");
};
