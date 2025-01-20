import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com', // Replace with your server URL
    timeout: 10000, // Optional: Set a timeout for requests
});

// Optional: Add interceptors for consistent response handling
axiosInstance.interceptors.response.use(
    (response) => response.data, // Extract the data directly
    (error) => {
        console.error('Error with the request:', error.message);
        return Promise.reject(error); // Forward error for further handling
    }
);

export default axiosInstance;
