import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUser } from "./api"
import { IoIosArrowBack } from "react-icons/io";


export const AllCommentsCard = ({ comments }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [userImg, setUserImg] = useState([])
    const { article_id } = useParams()

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

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>

    return <div>
        <a href={`/articles/${article_id}/comments`} className="back-button"><IoIosArrowBack /></a>
        {comments.map((comment) => {
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
    </div>
}