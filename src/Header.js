import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={props.isLoggedIn} onLogout={props.onLogout} />
    </div>
  );
};
export default Header;
