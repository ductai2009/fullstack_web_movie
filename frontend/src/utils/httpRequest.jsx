import axios from 'axios';
const DOMAIN_API = 'https://ophim1.com';
const request = axios.create({
    baseURL: DOMAIN_API,
    // baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

const DOMAIN_API_LOCAL = 'http://localhost:5001';
export const request_local = axios.create({
    baseURL: DOMAIN_API_LOCAL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    // baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export default request;
