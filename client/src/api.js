import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://powerful-scrubland-98539-f436d5130079.herokuapp.com/', // Replace with your server's address
});

// Add a request interceptor to attach the JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle token expiration
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    // Token has expired
    // Here you can handle what happens when the token has expired
    // For example, redirect the user to the login page
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
});

export default api;