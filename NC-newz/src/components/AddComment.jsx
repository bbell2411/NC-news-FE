import { useContext, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/User";
import { postComment } from "./api";

export const AddComment = ({ addedComment, setAddedComment }) => {
    const [post, setPost]= useState({})
    
    const { article_id } = useParams()
    const { loggedInUser } = useContext(UserContext)

    const handleInputChange = (e) => {
        setAddedComment(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postComment(article_id, addedComment, loggedInUser)
            .then((postedComment) => {
                console.log(postedComment)
                setPost(postedComment)
                setAddedComment("")
            })
    }

    return <form id="comment-input" onSubmit={handleSubmit}>
        <input value={addedComment} onChange={handleInputChange} type='text' placeholder="add a comment" >
        </input>  &nbsp;
        {addedComment !== '' ? <button type="submit"><IoSendOutline /></button> : null}
    </form>
}
