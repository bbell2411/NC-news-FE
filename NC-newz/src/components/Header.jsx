import { useState } from "react"
import { SearchBar } from "./SearchBar"

export const Header = () => {
    const [searchTerm, setSearchTerm]= useState([])
    return <section>
        <h1 className="header">NC News</h1>
        {/* <h3>{loggedInUser}</h3> */}
        <SearchBar setSearchTerm={setSearchTerm}/>
    </section>
}
//set term with input on change and handle sumbit onsubmit