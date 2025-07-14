import { useContext, useState } from "react"
import { SearchBar } from "./SearchBar"
import { UserContext } from "../../Contexts/User"
import logo from '../assets/images/logo.png'
export const Header = ({ setSearchTerm }) => {
    const { loggedInUser } = useContext(UserContext)

    return <section>
        <a href="/">
            <img className="logo" src={logo} alt="NC News logo" />
        </a>
        <a href="/" className="header">NC News</a>
        <div className="user-container">
            <img src='https://pbs.twimg.com/media/ErnRoKiXMAIqwGf.jpg' alt="user profile image" className="profile-pic" />
            <h3 className="username">{loggedInUser}</h3>
        </div>
        <SearchBar setSearchTerm={setSearchTerm} />
    </section>
}
