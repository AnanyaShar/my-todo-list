import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm";

import "./Login.scss";

const Login = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/register');
  }

  return (
    <div className="login-form-container">
      <h2 className="login-heading">Welcome Back</h2>
      <p className="login-info">Please enter your details</p>
      <LoginForm />
      <p className="register-text">Don't have a account yet? <span className="register-cta" onClick={onClickHandler}>Sign Up</span></p>
    </div>
  );
};

export default Login;
