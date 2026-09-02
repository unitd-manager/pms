import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let baseURL;

const { hostname } = window.location;

if (hostname === 'pmsdemo.unitdtechnologies.com') {
  baseURL = process.env.REACT_APP_PRODUCTION_URL;
} else if (hostname === 'pmsuts.unitdtechnologies.com') {
  baseURL = process.env.REACT_APP_TEST_URL;
} else if (hostname === 'localhost' || hostname === '127.0.0.1') {
  baseURL = process.env.REACT_APP_LOCAL_URL;
} else {
  baseURL = process.env.REACT_APP_TEST_URL;
}

console.log('Current Hostname:', hostname);
console.log('Using Base URL:', baseURL);

const api = axios.create({
  baseURL,
});

export default api;