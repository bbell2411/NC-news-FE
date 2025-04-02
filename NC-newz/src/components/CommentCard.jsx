import { useEffect, useState } from "react"
import { getComments } from "./api"

export const CommentCard = ({ article }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [comments, setComments] = useState([])
    const {article_id}=article
    console.log(article_id)
    useEffect(() => {
        setIsLoading(true)
        getComments(article_id).then(({comment}) => {
            setComments(comment)
        })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>
console.log(comments)
    return (
        comments.map((comment)=>{
            return <section key={comment.comment_id}>
                <p>{comment.body}</p>
                </section>
        })
    )
}