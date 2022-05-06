import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import history from "../../utils/history";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.form.pathname
      : "/tasks";
    dispatch(logIn({ payload: data, redirect }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        error={errors.password}
      />
      <div className="d-flex flex-column align-items-center">
        <button className="btn btn-primary w-75 mb-3" disabled={!isValid}>
          Войти
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
