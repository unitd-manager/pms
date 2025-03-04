// import axios from 'axios';
// import dotenv from 'dotenv';


// dotenv.config();
// let baseURL;

// const { hostname } = window.location;

// if (hostname === 'pmsdemo.unitdtechnologies.com') {
//   baseURL = process.env.REACT_APP_PRODUCTION_URL;
// } else if (hostname === 'pmsuts.unitdtechnologies.com') { 
//   baseURL = process.env.REACT_APP_TEST_URL;
// } else {
//   baseURL = process.env.REACT_APP_LOCAL_URL;
// }

// console.log('Current Hostname:', hostname);
// const api = axios.create({
//   baseURL,
// });

// export default api; 
import axios from 'axios'

const api = axios.create({
//baseURL:'http://66.29.149.122:3001',
baseURL: 'https://pmsuts.unitdtechnologies.com:3008',
//baseURL: 'http://localhost:3001',
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api