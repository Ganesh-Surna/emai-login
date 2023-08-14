import Button from "./Button";
import { useContext } from "react";
import classes from "./Navigation.module.css";
import AuthContext from "./auth-context";

const Navigation = (props) => {
  //const logoutHandler=()=>{
  //props.
  //};
  const ctx = useContext(AuthContext);
  return (
    <ul className={classes.list}>
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Users</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <a href="/">Admin</a>
        </li>
      )}
      {ctx.isLoggedIn && (
        <li>
          <Button onClick={ctx.onLogout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};
export default Navigation;
