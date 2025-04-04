import { useState } from "react";
import { IoSendOutline } from "react-icons/io5";

export const AddComment = ({setAddedComment}) => {
    const [input, setInput] = useState('')

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setAddedComment(input)
    }
    return <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type='text' placeholder="add a comment" >
        </input>  &nbsp;
        {input !== '' ? <button  type="submit"><IoSendOutline /></button>: null }
    </form>
}