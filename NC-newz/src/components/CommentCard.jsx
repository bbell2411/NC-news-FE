import { useEffect, useState } from "react"
import { getComments, getUser } from "./api"
import { Link, useParams } from "react-router-dom"
import { AddComment } from "./AddComment"


export const CommentCard = ({ addedComment, setAddedComment }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const [userImg, setUserImg] = useState([])

    const { article_id } = useParams()

    useEffect(() => {
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
            setComments(comment)
        })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article_id])

    const visibleComments = []

    if (comments.length > 4) {
        visibleComments.push(comments[0], comments[1], comments[2], comments[3])
    }
    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>

    return (<div>
        <a href="/" className="comment-button"> <i className="fa fa-home home-icon"></i> Home</a>  &nbsp; &nbsp; &nbsp;
        <a href={`/articles/${article_id}`} className="back-button">Back to Post</a> <br /> <br />

        <AddComment
            addedComment={addedComment}
            setAddedComment={setAddedComment}
            setComments={setComments}
            comments={comments}
        />
        {visibleComments.map((comment) => {
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
                    </div>
                    <p> {comment.body}</p>
                </section>
            </div>
        })}
        {comments.length < 5 ? null : <Link className="all-comments" to={`/articles/${article_id}/comments/all-comments`}>see all comments</Link>}

    </div>
    )
}
//fix votes
//fix commentss