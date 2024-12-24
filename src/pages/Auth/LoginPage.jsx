import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Typography } from "@mui/material";
import Form from "../../components/Form/Form";
import { loginFields } from "../../utils/constants";
import styles from "./LoginPage.module.css";
import AppLogo from "../../assets/AppLogo";
import useForm from "../../hooks/useForm";
import { login } from "../../redux/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

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

  const { formValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm(initialValues, validationRules, (formValues) => {
      dispatch(login(formValues)).then((action) => {
        if (login.fulfilled.match(action)) {
          navigate("/");
        }
      });
    });

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
        buttonTitle={
          status === "loading" ? <CircularProgress size={20} /> : "Login"
        }
      />
      {status === "failed" && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </div>
  );
}
