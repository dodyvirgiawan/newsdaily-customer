import axios from 'axios'

const happiApi = axios.create({
    baseURL: "https://api.happi.dev/v1",
    headers: {
        "x-happi-key": process.env.VUE_APP_HAPPI_API_KEY
    }
})

export default happiApi