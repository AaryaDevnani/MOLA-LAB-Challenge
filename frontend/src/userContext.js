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
    isLoggedIn: false,
    isAdmin: false,
    userData: {},
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
        `${process.env.REACT_APP_API_URI}api/user/mail`,
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
        `${process.env.REACT_APP_API_URI}api/user/register`,
        requestOptions
      );
      if (response.status !== 201) {
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
      `${process.env.REACT_APP_API_URI}api/user/login`,
      requestOptions
    );
    let responseBody = await response.json();
    return { status: response.status, body: responseBody };
  };

  const logout = async () => {
    setUserLoggedIn({
      isLoggedIn: false,
      isAdmin: false,
      userData: {},
    });
  };

  const deleteAccount = async () => {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({
        email: userLoggedIn.userData.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}api/user/delete`,
      requestOptions
    );
    let responseBody = await response.json();
    logout();
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
        logout,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
