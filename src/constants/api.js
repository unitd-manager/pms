import axios from 'axios'

const api = axios.create({
// baseURL: 'http://43.228.126.245:3007',
baseURL: 'http://localhost:3007',
});


export default api