import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { loginFields } from "../../utils/constants";
import styles from "./LoginPage.module.css";
import AppLogo from "../../assets/AppLogo";
import useForm from "../../hooks/useForm";

export default function LoginPage() {
  const navigate = useNavigate();

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

  const initialValues = {
    email: "",
    password: "",
  };

  const { formValues, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validationRules,
    (formValues) => {
      console.log("Form submitted with values:", formValues);
      navigate("/");
    }
  );

  return (
    <div className={styles.authForm}>
      <AppLogo />
      <Form
        fields={loginFields.map((field) => ({
          ...field,
          value: formValues[field.id] || "",
          error: errors[field.id] || null,
          onChange: (value) => handleChange(field.id, value),
          onBlur: () => handleBlur(field.id),
        }))}
        onSubmit={handleSubmit}
        buttonTitle={"Login"}
      />
    </div>
  );
}
