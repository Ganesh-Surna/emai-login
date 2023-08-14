import React, { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";
import AuthContext from "./auth-context";
import classes from "./App.module.css";

export default function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Header />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Logout />}
      </main>
    </React.Fragment>
  );
}
