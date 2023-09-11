import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [finalUser, setFinalUser] = useState({
    password: "",
    token: "",
    isAdmin: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [userLoggedIn, setUserLoggedIn] = useState({
    isLoggedIn: "",
    isAdmin: false,
  });

  const sendMail = async () => {
    if (user.firstName !== "" && user.lastName !== "" && user.email !== "") {
      const registerOptions = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:5000/api/user/mail",
        registerOptions
      );
      if (response.status !== 201) {
        return 400;
      }
      return 200;
    }
  };

  const setPassword = async (token) => {
    if (token !== "" && finalUser.password !== "") {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          password: finalUser.password,
          token,
          isAdmin: finalUser.isAdmin,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:5000/api/user/register",
        requestOptions
      );
      if (response.status !== 201) {
        console.log(response);
        return 400;
      }
      return 200;
    }
  };

  const login = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "http://localhost:5000/api/user/login",
      requestOptions
    );
    let responseBody = await response.json();
    console.log(responseBody);
    return { status: response.status, body: responseBody };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        sendMail,
        finalUser,
        setFinalUser,
        setPassword,
        userLoggedIn,
        setUserLoggedIn,
        loginData,
        setLoginData,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
