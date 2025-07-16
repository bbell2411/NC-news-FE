import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArticles } from "../components/api"

export const ArticleByTopic = () => {
    const [articlesByTopic, setArticlesByTopic] = useState([])
    const [sortBy, setSortBy] = useState("created_at")
    const [order, setOrder] = useState("desc")
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)
    const { topic } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticles({ topic, sort_by: sortBy, order }).then(({ articles }) => {
            setArticlesByTopic(articles)
        })
            .catch((err) => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [topic, sortBy, order])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (isError) return <p className="error">something went wrong</p>

    return <>
        <div id="topic-home"><a href="/" className="comment-button"> <i className="fa fa-home home-icon"></i> Home</a></div>
        <div className="sort-controls">
            <label htmlFor="sort-select">Sort by: </label>
            <select
                id="sort-select"
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="title">Title</option>
                <option value="author">Author</option>

            </select>

            <label>Order: </label>
            <button onClick={() => setOrder((prev) => (prev === "desc" ? "asc" : "desc"))}>
                {order === "desc" ? "Descending ⬇️" : "Ascending ⬆️"}
            </button>
        </div>
        {articlesByTopic.map((post) => {
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
        })}
    </>
}

