import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef
} from "react";
import Button from "./Button";
import classes from "./Login.module.css";
import AuthContext from "./auth-context";
import Input from "./Input";
import Card from "./Card";

const emailReducer = (prevState, action) => {
  if (action.type1 === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type1 === "INPUT_BLUR") {
    return { value: prevState.value, isValid: prevState.value.includes("@") };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (prevState, action) => {
  if (action.type1 === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type1 === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6
    };
  }
  return { value: "", isValid: null };
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("effect");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
      console.log("clean up");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ val: event.target.value, type1: "USER_INPUT" });
    //setFormIsValid(
    //event.target.value.includes("@") && password.trim().length > 6
    //);
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ val: event.target.value, type1: "USER_INPUT" });
    //setFormIsValid(email.includes("@") && event.target.value.trim().length > 6);
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type1: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type1: "INPUT_BLUR" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus1();
    } else {
      passwordInputRef.current.focus1();
    }
  };

  return (
    <Card className={classes.container}>
      <form>
        <Input
          ref={emailInputRef}
          label="E-mail"
          id="email"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          label="Password"
          id="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes["btn-container"]}>
          <Button onClick={submitHandler} type="submit">
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
