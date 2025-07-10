import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [loggedInUser, setLoggedInUser]= useState("tickle122")
    return <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>{children}</UserContext.Provider>
}