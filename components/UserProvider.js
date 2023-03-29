import { useState } from "react";
import { UserContext } from "../userData";

const initialUserAuthData = { avatar: "", name: "", email: "", password: "" };

export default function UserProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userAuthData, setUserAuthData] = useState(initialUserAuthData);

  const loginUser = (userData) => {
    setUserAuthData(userData);
    setIsAuth(true);
  };

  const logoutUser = () => {
    setUserAuthData(initialUserAuthData);
    setIsAuth(false);
  };

  const updateUserData = (data) => {
    setUserAuthData((prevState) => ({ ...prevState, ...data }));
  };

  return (
    <UserContext.Provider
      value={{
        isAuth,
        userAuthData,
        loginUser,
        logoutUser,
        updateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
