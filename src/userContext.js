import React,{ createContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }){
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:""
    })

    const [finalUser, setFinalUser] = useState({
        password: "",
        token: "",
        isAdmin: false
    })
    const sendMail = async () =>{
        if(user.firstName !== "" && user.lastName !== "" && user.email !== ""){
            const registerOptions = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                  'Content-Type': 'application/json'
                }
              };
            const response = await fetch('http://localhost:5000/api/user/mail', registerOptions);
            if(response.statusCode !== 201){
                console.log(response)
            }
        }
    }

    const setPassword = async (token) => {
        if(token !== "" && finalUser.password !== ""){
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    password: finalUser.password,
                    token,
                    isAdmin: finalUser.isAdmin
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              };
              const response = await fetch('http://localhost:5000/api/user/register', requestOptions);
              if(response.statusCode !== 201){
                console.log(response)
            }
        }
    }
    
    return (
        <UserContext.Provider value = {{user, setUser, sendMail, finalUser, setFinalUser, setPassword}}>{children}</UserContext.Provider>
    );

}

export default UserContext;