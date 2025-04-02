import { Link } from "react-router-dom";

export const ViewCommentsLink = ({article}) => {
    return <Link to={"/article/comments"}>
        <p>View {article.comment_count} comments</p>
    </Link>
}