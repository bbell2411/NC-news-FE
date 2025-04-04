import { Link, useParams } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { useState } from "react";
import { updateVotes } from "./api";

export const ArticleCard = ({ article, userImage }) => {
    const [optimisticVotes, setOptimisticVotes] = useState(0)
    const [userVote, setUserVote] = useState(0)

    const { article_id } = useParams()

    const userPfpArr = userImage.map((user) => {
        return user.username === article.author ? user.avatar_url : null
    })
    let profilePic = ''
    for (let i = 0; i < userPfpArr.length; i++) {
        if (userPfpArr[i] !== null) {
            profilePic = userPfpArr[i]
        }
    }

    const handleUpVote = () => {
        if (userVote === 1) {
            setOptimisticVotes((currVotes) => currVotes - 1)
            setUserVote(0)
        } else {
            setOptimisticVotes((currVotes) => currVotes + (userVote === -1 ? 2 : 1))
            setUserVote(1)
        }
        updateVotes(article_id).catch(() => {
            setOptimisticVotes((currVotes) => currVotes - 1)
            setUserVote(0)
        });
    };

    const handleDownVote = () => {
        if (userVote === -1) {
            setOptimisticVotes((currVotes) => currVotes + 1)
            setUserVote(0)
        } else {
            setOptimisticVotes((currVotes) => currVotes - (userVote === 1 ? 2 : 1))
            setUserVote(-1)
        }
        updateVotes(article_id).catch(() => {
            setOptimisticVotes((currVotes) => currVotes + 1)
            setUserVote(0)
        });
    };

    return (

        <div className="article-container">
            <a href="/" className="comment-button"> <i className="fa fa-home home-icon"></i> Home</a>  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
            <Link className='comment-button' to={`/articles/${article.article_id}/comments`}><FaCommentDots />   {article.comment_count}</Link>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
                {profilePic !== '' ? <img src={profilePic} alt="user's profile image" /> : null}
                {article.author} | {article.topic} | {article.created_at}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button className='icon-link' onClick={handleUpVote}> <SlLike /></button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<button className='icon-link' onClick={handleDownVote}><SlDislike /></button>
            </p>
            <img
                className="article-image"
                src={article.article_img_url}
                alt={article.title}
            />
            <p className="article-body">{article.body}</p>
            <p className="article-votes">Votes: {article.votes + optimisticVotes} | Comments: {article.comment_count}</p>
        </div>
    );
}
