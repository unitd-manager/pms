import axios from 'axios';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://43.228.126.245:3007';
} else {
  baseURL = 'http://43.228.126.245:3007';
}

console.log('NODE_ENV:', process.env.NODE_ENV);
// const api = axios.create({
// <<<<<<< HEAD
// //baseURL: 'http://43.228.126.245:3007',
//  baseURL: 'http://localhost:3007',
// =======
//   baseURL,
// >>>>>>> 76227c53075ce32562c245f02a3b9d93c548bac6
// });

export default api;