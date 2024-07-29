import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();
let baseURL;

const { hostname } = window.location;

if (hostname === 'pmsdemo.zaitunsoftsolutions.com') {
  baseURL = process.env.REACT_APP_PRODUCTION_URL;
} else if (hostname === 'pmsuts.unitdtechnologies.com') { 
  baseURL = process.env.REACT_APP_TEST_URL;
} else {
  baseURL = process.env.REACT_APP_TEST_URL;
}

console.log('Current Hostname:', hostname);
const api = axios.create({
  baseURL,
});

export default api;