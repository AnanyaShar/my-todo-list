import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../InputBox/InputBox";
import { getUser } from "../../apis/apiCalls";
import './LoginForm.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[errorMessage, setErrorMessage] = useState('')

  const onLoginClick = async(event) => {
    event.preventDefault();
    const data = {
      'username': username, 
      'password': password
    }
    const response = await getUser(data)
    if(response.errorCode) {
      setErrorMessage(response.errorMessage)
    }else{
      localStorage.setItem('token', response.data.token)
      navigate(`/dashboard/${response.data.user_id}/?username=${response.data.username}`)
    }
  }

  const onNameChangeHandler = (event) => {
    setUsername(event.target.value)
  }


  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <form className="login-form">
        <InputBox
          type="text"
          label="Username"
          placeholder="Username"
          value={username}
          onChangeHandler={onNameChangeHandler}
        />

        <InputBox
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeHandler={onPasswordChangeHandler}
          errorMessage={errorMessage}
        />
        <button className="login-button" onClick={onLoginClick}>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
