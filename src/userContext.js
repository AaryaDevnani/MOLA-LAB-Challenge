import React,{ createContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }){
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        isAdmin:false
    })

    const signUp = async () =>{
        if(user){
            const registerOptions = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                  'Content-Type': 'application/json'
                }
              };
            console.log("we trying to fetch")
            const response = await fetch('http://localhost:5000/api/user/mail', registerOptions);
            if(response.statusCode !== 201){
                console.log(response)
            }
        }
    }
    
    return (
        <UserContext.Provider value = {{user, setUser, signUp}}>{children}</UserContext.Provider>
    );

}

export default UserContext;