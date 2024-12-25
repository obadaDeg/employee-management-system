import { useState } from "react";
import { validateForm } from "../utils/form-validation";
const useForm = (initialValues, validationRules, onSubmit) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field) => {
    const fieldErrors = validateForm(
      { [field]: formValues[field] },
      { [field]: validationRules[field] }
    );
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const validationErrors = validateForm(formValues, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formValues); 
    }
  };

  return {
    formValues,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
