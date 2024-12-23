export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const value = formData[field];
    const rules = validationRules[field];

    rules.forEach((rule) => {
      if (rule.type === "required" && (!value || value.trim() === "")) {
        errors[field] = rule.message || `${field} is required.`;
      }

      if (rule.type === "email" && value) {
        if (!validateEmail(value)) {
          errors[field] = rule.message || "Invalid email format.";
        }
      }

      if (rule.type === "minLength" && value) {
        if (value.length < rule.value) {
          errors[field] =
            rule.message ||
            `${field} must be at least ${rule.value} characters long.`;
        }
      }

      if (rule.type === "maxLength" && value) {
        if (value.length > rule.value) {
          errors[field] =
            rule.message ||
            `${field} must be at most ${rule.value} characters long.`;
        }
      }

      if (rule.type === "pattern" && value) {
        if (!rule.value.test(value)) {
          errors[field] = rule.message || `${field} format is invalid.`;
        }
      }

      if (rule.type === "custom" && rule.validate) {
        const customError = rule.validate(value, formData);
        if (customError) {
          errors[field] = customError;
        }
      }
    });
  });

  return errors;
};
