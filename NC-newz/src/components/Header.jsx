import { useContext, useState } from "react"
import { SearchBar } from "./SearchBar"
import { UserContext } from "../../Contexts/User"

export const Header = () => {
    const { loggedInUser } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState([])

    return <section>
        <h1 className="header">NC News</h1>
        <h3>{loggedInUser}</h3>
        <SearchBar setSearchTerm={setSearchTerm} />
    </section>
}
//FETCH WITH SEARCH TERM AFTER MAKING FETCH FOR HOME PAGE
// AND AVATAR URL