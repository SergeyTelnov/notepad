import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isEmail: {
        message: "Email введён некорректно"
      },
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      }
    },
    password: {
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      },
      isRequired: {
        message: "Пароль обязателен для заполнения"
      }
    },
    name: {
      isRequired: {
        message: "Поле обязательно для заполнения"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(signUp(data));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
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
      <div className="d-flex flex-column align-items-center mb-3">
        <button className="btn btn-success w-75" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
