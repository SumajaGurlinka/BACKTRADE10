import axios from 'axios';
const axiosInstance1 = axios.create({
    baseURL: 'http://localhost:9090/',
});
axiosInstance1.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

    export default axiosInstance1;