import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-newz-u95l.onrender.com/api'
})

export const getArticles = ({ topic, sort_by, order } = {}) => {
    const params = new URLSearchParams()

    if (topic && topic !== undefined) params.append("topics", topic)
    if (sort_by) params.append("sort_by", sort_by);
    if (order) params.append("order", order)

    return newsApi.get(`/articles?${params.toString()}`)
        .then(({ data }) => {
            return data
        })
}

export const getArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}`)
        .then(({ data: { article } }) => {
            return article
        })
}

export const getUser = () => {
    return newsApi.get('/users')
        .then(({ data: { users } }) => {
            return users
        })
}

export const getComments = (article_id) => {
    if (article_id !== undefined) {
        return newsApi.get(`/articles/${article_id}/comments`)
            .then(({ data: { comment } }) => {
                return comment
            })
    }
}

export const updateVotes = (article_id, amount) => {
    return newsApi.patch(`/articles/${article_id}`, { inc_votes: amount })
        .then(({ data }) => {
            return data
        })
}

export const postComment = (article_id, addedComment, loggedInUser) => {
    return newsApi.post(`/articles/${article_id}/comments`, { username: loggedInUser, body: addedComment })
        .then(({ data }) => {
            return data.postedComment
        })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
        .then(({ data }) => {
            return data
        })
}

export const getTopics = () => {
    return newsApi.get('/topics')
        .then(({ data: { topics } }) => {
            return topics
        })
}
