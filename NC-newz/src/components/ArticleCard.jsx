import { Link, useParams } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { useEffect, useState } from "react";
import { updateVotes } from "./api";

export const ArticleCard = ({ article, userImage }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [optimisticVotes, setOptimisticVotes] = useState(0)

    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        updateVotes(article_id).then((inc_votes) => {
        })
            .catch((err) => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return <div className="loader-container"><h1 className="loader"></h1></div>

    if (error) return <p className="error">something went wrong</p>


    const userPfpArr = userImage.map((user) => {
        return user.username === article.author ? user.avatar_url : null
    })
    let profilePic = ''
    for (let i = 0; i < userPfpArr.length; i++) {
        if (userPfpArr[i] !== null) {
            profilePic = userPfpArr[i]
        }
    }
    return (

        <div className="article-container">
            <a href="/" className="comment-button"> <i className="fa fa-home home-icon"></i> Home</a>  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
            <Link className='comment-button' to={`/articles/${article.article_id}/comments`}><FaCommentDots />   {article.comment_count}</Link>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
                {profilePic !== '' ? <img src={profilePic} alt="user's profile image" /> : null}
                {article.author} | {article.topic} | {article.created_at}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button className='icon-link'> onClick={handleUpVote}<SlLike /></button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<button onClick={handleDownVote} className='icon-link'><SlDislike /></button>
            </p>
            <img
                className="article-image"
                src={article.article_img_url}
                alt={article.title}
            />
            <p className="article-body">{article.body}</p>
            <p className="article-votes">Votes: {article.votes} | Comments: {article.comment_count}</p>
        </div>
    );
}
// vote on the article that they are reading.
// Things to consider:

// How are the current number of votes displayed?
// How will a user increment/decrement the total number of votes?
// Can the change in votes be rendered optimistically?
// How will a user be alerted if the API request fails?