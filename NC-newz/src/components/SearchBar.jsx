import { useState } from "react"

export const SearchBar = ({setSearchTerm}) => {
    const [input, setInput] = useState([])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = () => {
        setSearchTerm(input)
    }
    return <form onSubmit={handleSubmit}>
        <label className="search-bar">Explore</label>
        <input onChange={handleChange} className="input"></input>
        <button type="submit" ><i className="fa fa-search"></i></button>
    </form>
}

