import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArticles } from "../components/api"

export const ArticleByTopic = () => {
    const [articlesByTopic, setArticlesByTopic] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)
    const { topic } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticles({ topic })
            .then((articles) => {
                setArticlesByTopic(articles.articles)
            })
            .catch((err) => {
                setIsError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [topic])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (isError) return <p className="error">something went wrong</p>

    return articlesByTopic.map((post) => {
        return <article className="post" key={post.article_id}>
            <Link to={`/articles/${post.article_id}`}
                state={{ fromTopic: topic }}>
                <img className="post-image clickable" src={post.article_img_url} alt="article image" />
            </Link>
            <section>
                <Link to={`/articles/${post.article_id}`}
                    state={{ fromTopic: topic }}>
                    <p className="post-title clickable">{post.title}</p>
                </Link>
                <p className='post-topic'>{post.topic}</p>
                <p className="post-votes" >{post.votes}</p>
                <p className="post-author" >{post.author}</p>
                <p className="post-created-at" >{post.created_at}</p>
                <p className="post-comments" >{post.comment_count}</p>
            </section>
        </article>

    }
    )
}