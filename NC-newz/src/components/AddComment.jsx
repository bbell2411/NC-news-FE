import { useContext, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/User";
import { postComment } from "./api";

export const AddComment = ({ addedComment, setAddedComment, comments, setComments }) => {
    const { article_id } = useParams()
    const { loggedInUser } = useContext(UserContext)

    const handleInputChange = (e) => {
        setAddedComment(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postComment(article_id, addedComment, loggedInUser)
            .then((postedComment) => {
                setComments((currComments) => [postedComment, ...currComments])
                setAddedComment("")
            })
    }

    return <form id="comment-input" onSubmit={handleSubmit}>
        <input value={addedComment} onChange={handleInputChange} type='text' placeholder="add a comment" >
        </input>  &nbsp;
        {addedComment.trim() !== '' ? <button type="submit"><IoSendOutline /></button> : null}
    </form>
}
