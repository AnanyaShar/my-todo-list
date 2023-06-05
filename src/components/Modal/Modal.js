import React, { useState }  from "react";
import InputBox from '../InputBox';
import './Modal.scss'

const Modal = (props) => {

    const onClickHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        props.setShowModal(false);
    }

    return (
        <>
            <div className="modal-overlay" onClick={onClickHandler}></div>
            <div className="modal">
                {props.children}
                <button className="save-button" onClick={props.onSave}>Save</button>
            </div>
        </>
        
    )
}

export default Modal