import axios from 'axios'

const API = {
    movieInfo: movie => {
    return axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=d4e6f675&`)
    }
}


export default API