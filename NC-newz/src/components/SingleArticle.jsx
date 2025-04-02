import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticle, getUser } from "./api"

export const SingleArticle = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [userImage, setUserImage] = useState([])
    const [article, setArticle] = useState([])
    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id).then((article) => {
            setArticle(article)
        })
            .catch((err) => {
                setError(true)
            })
        setIsLoading(true)
        getUser().then((users) => {
            setUserImage(users)
        })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article_id])

    useEffect(() => {
        setIsLoading(true)
        getUser().then((users) => {
            setUserImage(users)
        }).catch((err) => {
            setError(true)
        })
            .finally(() => {
                setIsLoading(false)
            })
    }, [article])

    const userPfpArr = userImage.map((user) => {
        return user.username === article.author ? user.avatar_url : null
    })
    let profilePic = ''
    for (let i = 0; i < userPfpArr.length; i++) {
        if (userPfpArr[i] !== null) {
            profilePic = userPfpArr[i]
        }
    }
    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>

    return (
        <div className="article-container">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
                { profilePic !== '' ? <img src= {profilePic} alt="user's profile image"/>: null}
                {article.author} | {article.topic} | {article.created_at}
            </p>
            <img
                className="article-image"
                src={article.article_img_url}
                alt={article.title}
            />
            <p className="article-body">{article.body}</p>
            <p className="article-votes">Votes: {article.votes} | Comments: {article.comment_count}</p>
            <a href="/" className="back-button">Back to Home</a>
        </div>
    );
};
