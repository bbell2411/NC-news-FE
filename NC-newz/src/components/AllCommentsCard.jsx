import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteComment, getComments, getUser } from "./api"
import { IoIosArrowBack } from "react-icons/io";
import { AddComment } from "./AddComment";
import { UserContext } from "../../Contexts/User";
import bin from "../assets/images/bin.png"


export const AllCommentsCard = ({ addedComment, setAddedComment }) => {
    const [allComments, setAllComments] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [userImg, setUserImg] = useState([])
    const { article_id } = useParams()
    const { loggedInUser } = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        getUser().then((users) => {
            setUserImg(users)
        })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article_id])

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id).then((comment) => {
            setAllComments(comment)
        })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article_id])

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?")
        if (!confirmed) return
        setAllComments((currComments) => currComments.filter(comment => comment.comment_id !== id))
        deleteComment(id)
            .then(() => {
                alert("Comment deleted successfully.")
            })
            .catch((err) => {
                alert("Failed to delete comment.")
            })
    }

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>

    return <div>
        <a href={`/articles/${article_id}/comments`} className="add-comment-button"><IoIosArrowBack /></a>

        <AddComment
            addedComment={addedComment}
            setAddedComment={setAddedComment}
            setComments={setAllComments}
            comments={allComments}
        />

        {allComments.map((comment) => {
            const userPfpArr = userImg.map((user) => {
                return user.username === comment.author ? user.avatar_url : null
            })
            let profilePic = ''
            for (let i = 0; i < userPfpArr.length; i++) {
                if (userPfpArr[i] !== null) {
                    profilePic = userPfpArr[i]
                }
            }
            return <div key={comment.comment_id} className="comments-section">
                <section className="comment">
                    <div className="comment-header">
                        {profilePic !== '' ? <img src={profilePic} alt="user's profile image" /> : null}
                        <p className="comment-user">{comment.author}</p>
                        <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
                        {comment.author === loggedInUser && (
                            <div className="comment-actions">
                                <img
                                    className="comment-delete" src={bin} alt="delete-comment"
                                    onClick={() => { handleDelete(comment.comment_id) }}
                                />
                            </div>
                        )}
                    </div>
                    <p> {comment.body}</p>
                </section>
            </div>
        })}
    </div>
}