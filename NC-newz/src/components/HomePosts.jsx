import { useEffect, useState } from "react"
import { getArticles } from "./api"


export const HomePosts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getArticles().then(({articles}) => {
            setPosts(articles)
        })
        .catch((err)=>{
            setIsError(true)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <h1 className="loading"></h1>
    
    if (isError) return <p className="error">something went wrong</p>
    console.log(posts)

    return posts.map((post)=>{
       return <article  className="post" key={post.article_id}>
        <img className="post-image" src={post.article_img_url} alt="article image"/>
      <section>
      <p className="post-title">{post.title}</p>
        <p className='post-topic'>{post.topic}</p>
        <p className="post-votes" >{post.votes}</p>
        <p className="post-author" >{post.author}</p>
        <p className="post-body" >{post.body}</p>
        <p className="post-created-at" >{post.created_at}</p>
        <p className="post-comments" >{post.comment_count}</p>
      </section>
        </article>
    })

    }
//sort by newest
//error handle