import React from "react";

import "./InputBox.scss";

const InputBox = (props) => {
  return (
    <div className={`${props.containerClassName} input-container`}>
      <label className={`${props.labelContainerClassName} input-label-container`}>
        <div className={`input-label ${props.labelClassName} `}>{props.label}</div>
        <input 
          type={props.type}
          className={`${props.errorMessage && 'error-boundary'} ${props.className} input-box`}
          placeholder={props.placeholder} 
          value={props.value} 
          onChange={props.onChangeHandler}
          name={props.name}
        />
        {props.icon && <div className="input-icon">{props.icon}</div>}
      </label>
      {props.errorMessage && <p className="input-error-message">{props.errorMessage}</p>}
    </div>
  );
};

export default InputBox;
