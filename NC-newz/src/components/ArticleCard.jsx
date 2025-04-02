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
        <a href="/" className="back-button">Back to Home</a>
    </div>
);
}