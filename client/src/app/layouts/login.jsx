import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 rounded-3 border bg-light">
          {formType === "register" ? (
            <>
              <div className="text-center">
                <h4 className="mb-4">Регистрация</h4>
              </div>
              <RegisterForm />
              <div className="d-flex flex-column align-items-center">
                <p>
                  Уже есть аккаунт?{" "}
                  <a role="button" onClick={toggleFormType}>
                    Войти
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <h4 className="mb-4">Вход</h4>
              </div>
              <LoginForm />
              <div className="d-flex flex-column align-items-center">
                <p>
                  Нет аккаунта?{" "}
                  <a role="button" onClick={toggleFormType}>
                    Зарегистрироваться
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
