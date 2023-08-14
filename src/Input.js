import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const active1 = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus1: active1 };
  });
  return (
    <div
      className={`${classes["input-group"]} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        id={props.id}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;
