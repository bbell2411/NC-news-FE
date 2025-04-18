import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-newz-u95l.onrender.com/api'
})

export const getArticles = () => {
    return newsApi.get('/articles')
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

export const updateVotes = (article_id) => {
    return newsApi.patch(`/articles/${article_id}`, { inc_votes: 1 })
        .then(({ data }) => {
            return data
        })
}

export const postComment = (article_id, addedComment, loggedInUser) => {
    console.log('were in')
        return newsApi.post(`/articles/${article_id}/comments`, { username: loggedInUser, body: addedComment })
            .then(({ data }) => {
                console.log('were in again')
                return data
            })
    }
// i am currently reaching line 45, need to check the colour of the bracket for template literal
// currently, when i click submit, i am invoking a post request, however...
// it says not found on insomnia and HERE TOO!
// check backend (probs not the problem)
//optimistic rendering?
// ANYWAY PRIRITISE THE POST REQ AND FIX 404
//also this is for later to stress about, but presenting the...
//new comment in add comment or a diff componenet and where do i 
//invoke it? will probs need logic to handle inside submit? not sure...