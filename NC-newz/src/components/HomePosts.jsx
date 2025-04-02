import { useEffect, useState } from "react"
import { getArticles } from "./api"
import { Link } from "react-router-dom";


export const HomePosts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticles().then(({ articles }) => {
            setPosts(articles)
        })
            .catch((err) => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (isError) return <p className="error">something went wrong</p>

    return posts.map((post) => {
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

// see the comments linked with an individual article alongside it.
// Things to consider:

// click on comment count in home page links to comment card of that article id
// comments inside the single article

// How is a comment card presented?
// How are the comment cards arranged to make use of the available space?
