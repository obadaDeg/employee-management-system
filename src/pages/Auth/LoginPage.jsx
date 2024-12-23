import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { validateForm } from "../../utils/form-validation";
import { loginFields } from "../../utils/constants";
import styles from "./LoginPage.module.css";
import AppLogo from "../../assets/AppLogo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validationRules = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "email", message: "Please enter a valid email address." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minLength",
        value: 6,
        message: "Password must be at least 6 characters long.",
      },
    ],
  };

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const fieldErrors = validateForm(
      { [field]: formValues[field] },
      { [field]: validationRules[field] }
    );
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || null }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formValues, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/");
    }
  };

  return (
    <div className={styles.authForm}>
      <AppLogo />
      <Form
        fields={loginFields.map((field) => ({
          ...field,
          value: formValues[field.id] || "",
          error: touched[field.id] ? errors[field.id] : null,
          onChange: (value) => handleChange(field.id, value),
          onBlur: () => handleBlur(field.id),
        }))}
        onSubmit={handleSubmit}
        buttonTitle={"Login"}
      />
    </div>
  );
}
