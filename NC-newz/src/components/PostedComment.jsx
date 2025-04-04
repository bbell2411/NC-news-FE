import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/User"
import { postComment } from "./api"
import { useParams } from "react-router-dom"


export const PostedComment = ({ addedComment }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { loggedInUser } = useContext(UserContext)

    const { article_id } = useParams()

    const [post, setPost] = useState({})

    useEffect(() => {
        const bodyString = addedComment.toString()
        setIsLoading(true)
        postComment(article_id, bodyString, loggedInUser).then((result) => {
            setPost(result)
        })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article_id])
    
    console.log(post)

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>

}