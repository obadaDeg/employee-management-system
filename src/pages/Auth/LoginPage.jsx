import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form/Form";
import useForm from "../../hooks/useForm";
import { validateForm } from "../../utils/form-validation";
import { loginFields } from "../../utils/constants";
import styles from "./LoginPage.module.css";
import AppLogo from "../../assets/AppLogo";
import { login } from "../../store/auth-slice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const initialValues = loginFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

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

  const onSubmit = (values) => {
    dispatch(login(values)).then((action) => {
      console.log(action.meta.requestStatus);

      if (action.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  const { formValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm(initialValues, validationRules, onSubmit);

  return (
    <div className={styles.authForm}>
      <AppLogo />
      <Form
        fields={loginFields.map((field) => ({
          ...field,
          value: formValues[field.id],
          error: errors[field.id],
          onChange: (value) => handleChange(field.id, value),
          onBlur: () => handleBlur(field.id),
        }))}
        onSubmit={handleSubmit}
        buttonTitle={status === "loading" ? "Logging in..." : "Login"}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}


