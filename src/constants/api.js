// import axios from 'axios';

// let baseURL;

// if (process.env.NODE_ENV === 'production') {
//   baseURL = 'http://43.228.126.245:3007';
// } else {
//   baseURL = 'http://localhost:3007';
// }

// console.log('NODE_ENV:', process.env.NODE_ENV);
// const api = axios.create({
//   baseURL, // Use the baseURL variable here
// });

// export default api;
import axios from 'axios'

const api = axios.create({
baseURL: 'http://43.228.126.245:3007',

});

export default api