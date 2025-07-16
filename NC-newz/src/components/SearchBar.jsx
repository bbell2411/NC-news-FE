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
}

