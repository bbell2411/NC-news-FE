import { useContext, useState } from "react"
import { SearchBar } from "./SearchBar"
import { UserContext } from "../../Contexts/User"

export const Header = () => {
    const { loggedInUser } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState([])

    return <section>
        <h1 className="header">NC News</h1>
        <div className="user-container">
            <img src='https://pbs.twimg.com/media/ErnRoKiXMAIqwGf.jpg' alt="user profile image" className="profile-pic" />
            <h3 className="username">{loggedInUser}</h3>
        </div>
        <SearchBar setSearchTerm={setSearchTerm} />
    </section>
}
