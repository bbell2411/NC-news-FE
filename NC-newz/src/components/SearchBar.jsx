import { useState } from "react"
import { Link } from "react-router-dom"

export const SearchBar = ({ setSearchTerm }) => {
    const [input, setInput] = useState([])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerm(input)
    }
    return <div className="search-header">
        <a href="/all-topics" className="topics-link">Topics</a>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} placeholder="Explore" className="input"></input>
            <button type="submit" ><i className="fa fa-search"></i></button>
        </form>
    </div>
}

