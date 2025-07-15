import { Link, useParams } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { useEffect, useState } from "react";
import { updateVotes } from "./api";
import { useLocation } from "react-router-dom"


export const ArticleCard = ({ article, userImage }) => {
    const [optimisticVotes, setOptimisticVotes] = useState(0)
    const [userVote, setUserVote] = useState(0)

    const location = useLocation();
    const fromTopic = location.state?.fromTopic

    const { article_id } = article

    useEffect(() => {
        const savedVote = localStorage.getItem(`voted-${article_id}`);
        if (savedVote === '1') {
            setUserVote(1)
        }
    }, [article_id])


    const handleVote = () => {
        if (userVote === 1) {
            setOptimisticVotes((currentVotes) => currentVotes - 1)
            setUserVote(0)
            updateVotes(article_id, -1)
            localStorage.removeItem(`voted-${article_id}`)
        } else {
            setOptimisticVotes((currentVotes) => currentVotes + 1)
            setUserVote(1)
            updateVotes(article_id, 1)
            localStorage.setItem(`voted-${article_id}`, '1')
        }
    }

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
            {fromTopic ?
                <Link className="comment-button" to={`/all-topics/${fromTopic}`}>←</Link> :
                <a href="/" className="comment-button"> <i className="fa fa-home home-icon"></i> Home</a>}
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
            <Link className='comment-button' to={`/articles/${article.article_id}/comments`}><FaCommentDots />   {article.comment_count}</Link>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
                {profilePic ? <img src={profilePic} alt="user's profile image" /> : null}
                {article.author} | {article.topic} | {article.created_at}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button className="icon-link" onClick={handleVote}>
                    {userVote === 1 ? (
                        <>
                            <SlDislike /> Unlike
                        </>
                    ) : (
                        <>
                            <SlLike /> Like
                        </>
                    )}
                </button>

            </p>
            <img
                className="article-image"
                src={article.article_img_url}
                alt={article.title}
            />
            <p className="article-body">{article.body}</p>
            <p className="article-votes">Votes: {article.votes + optimisticVotes} | Comments: {article.comment_count}</p>
        </div>
    )
}
