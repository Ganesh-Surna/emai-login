import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("isLoggedIn");
    if (userInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const LoginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const LogoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: LogoutHandler,
        onLogin: LoginHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
