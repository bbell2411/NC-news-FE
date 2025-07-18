import { useEffect, useState } from "react"
import { getArticles } from "./api"
import { Link } from "react-router-dom";


export const HomePosts = () => {
    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState("created_at")
    const [order, setOrder] = useState("desc")

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticles({ sort_by: sortBy, order }).then(({ articles }) => {
            setPosts(articles)
        })
            .catch((err) => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [sortBy, order])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (isError) return <p className="error">something went wrong</p>

    return <section>
        <div className="search-header">
        <a href="/all-topics" className="topics-link">Topics</a>
        </div>
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
        {posts.map((post) => {
            return <article className="post" key={post.article_id}>
                <Link to={`/articles/${post.article_id}`}><img className="post-image clickable" src={post.article_img_url} alt="article image" /></Link>
                <section>
                    <Link to={`/articles/${post.article_id}`}><p className="post-title clickable">{post.title}</p></Link>
                    <p className='post-topic'>{post.topic}</p>
                    <p className="post-votes" >{post.votes}</p>
                    <p className="post-author" >{post.author}</p>
                    <p className="post-created-at" >{post.created_at}</p>
                    <p className="post-comments" >{post.comment_count}</p>
                </section>
            </article>
        })

        }
    </section>
}

