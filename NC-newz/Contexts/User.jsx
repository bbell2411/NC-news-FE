import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [loggedInUser, setLoggedInUser]= useState('bell_24')
    return <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>{children}</UserContext.Provider>
}