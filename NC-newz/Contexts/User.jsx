import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [loggedInUser, setLoggedInUser]= useState("icellusedkars")
    return <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>{children}</UserContext.Provider>
}