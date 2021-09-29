import axios from 'axios'

const newsApi = axios.create({
    baseURL: "https://news-daily.herokuapp.com"
})

export default newsApi