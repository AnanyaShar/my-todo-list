import React from 'react';
import { useNavigate } from "react-router-dom";
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './Registration.scss';

const Registration = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate('/');
    }

    return (
        <div className='registration-container'>
            <h2 className='registration-heading'>Get Started</h2>
            <p className='registration-info'>Create your account now</p>
            <RegistrationForm />
            <p className='login-account'>Already have an account? <span className='login-cta' onClick={onClickHandler}>Login</span></p>   
        </div>
    )
}

export default Registration