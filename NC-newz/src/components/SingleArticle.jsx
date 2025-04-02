import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticle, getUser } from "./api"
import { ArticleCard } from "./ArticleCard";

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
    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>
 return <ArticleCard article={article} userImage={userImage} />
};
