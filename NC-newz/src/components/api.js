import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-newz-u95l.onrender.com/api'
})

export const getArticles = () => {
    return newsApi.get('/articles')
    .then(({data})=>{
        return data
    })
}