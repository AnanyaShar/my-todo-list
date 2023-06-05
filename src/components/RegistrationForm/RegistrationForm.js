import React, { useState, useEffect } from "react";
import { registerUser } from "../../apis/apiCalls";
import { useNavigate } from "react-router-dom";
import "./RegistrationForm.scss";
import InputBox from "../InputBox/InputBox";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const[formDetails, setFormDetails] = useState({'username': '', 'firstName': '', 'email': '', 'password': ''})
  const[formErrors, setFormErrors] = useState({'username': '', 'firstName': '', 'email': '', 'password': ''})
  const[isEmailValid, setIsEmailValid] = useState(true)
  const[isPasswordValid, setIsPasswordValid] = useState(true)
  const[isUserNameValid, setIsUserNameValid] = useState(true)

  useEffect(() => {
    setFormErrors((prev) => ({...prev, 'username':'',  'email': '', 'password': ''}))
    if(!isUserNameValid) {
      setFormErrors((prev) => ({...prev, 'username': 'Username must be 125 characters or less'}))
    }

    if(!isEmailValid) {
      setFormErrors((prev) => ({...prev, 'email': 'Please provide a valid email address'}))
    }
    if(!isPasswordValid) {
      setFormErrors((prev) => ({...prev, 'password': 'Password must contain 8 letters, 1 uppercase, 1 lowercase, 1 number and 1 special character'}))
    }

  }, [isEmailValid, isPasswordValid, isUserNameValid])


  const getErrorMessage = (error) => {
    switch(error.errorCode) {
      case 410:
      case 415:
        setFormErrors((prev) => ({...prev, 'username': error.errorMessage}));
        return;
    }
  }

  const onClickHandler = async(event) => {
    event.preventDefault();
    if(!isEmailValid || !isPasswordValid || !isUserNameValid) return;
    const response = await registerUser(formDetails)
    console.log(response);
    if(response.errorCode) {
      getErrorMessage(response)
    }else {
      navigate('/');
    }

  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let emailValid = true;
    let passwordValid = true;
    let userNameValid = true;

    if(name === 'username') {
      if(value > 125) {
        userNameValid = false;
      }
    }


    if(name === 'password') {
      const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if(!re.test(value)) {
        passwordValid = false;
      }
    }

    if(name === 'email') {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!re.test(value)) {
        emailValid = false;
      }
    }
    setIsEmailValid(emailValid);
    setIsPasswordValid(passwordValid);
    setIsUserNameValid(userNameValid);
    setFormDetails((prev) => ({...prev, [name]: value}));
  }

  const FORM_FIELDS = [
    {
      "type" : "text",
      "label" : "Username",
      "placeholder" : "Enter username",
      "name": "username",
      "value" : formDetails.username,
      "errorMessage": formErrors.username
    },
    {
      "type" : "text",
      "label" : "First Name",
      "placeholder" : "Enter first name",
      "name": "firstName",
      "value" : formDetails.firstName,
      "errorMessage": formErrors.firstName
    },
    {
      "type" : "text",
      "label" : "Email Address",
      "placeholder" : "Enter email address",
      "name": "email",
      "value" : formDetails.email,
      "errorMessage": formErrors.email
    },
    {
      "type" : "password",
      "label" : "Password",
      "placeholder" : "Enter your password",
      "name": "password",
      "value" : formDetails.password,
      "errorMessage": formErrors.password
    }
  ]

  

  return (
    <>
      <form>
        {
          FORM_FIELDS.map((formField) => {
            return (
              <InputBox
                key={formField.name}
                type={formField.type}
                label={formField.label}
                placeholder={formField.placeholder}
                value={formField.value}
                name={formField.name}
                onChangeHandler={onChangeHandler}
                errorMessage={formField.errorMessage}
              />
            )
          })
        }
        <button className="registration-button" onClick={onClickHandler}>Create Account</button>
      </form>
    </>
  );
};

export default RegistrationForm;
