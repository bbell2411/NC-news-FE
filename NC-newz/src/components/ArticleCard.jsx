import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

export const ArticleCard = ({article, userImage}) => {
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
             <Link  className='comment-button' to={`/articles/${article.article_id}/comments`}><FaCommentDots />   {article.comment_count}</Link> 
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
    </div>
);
}