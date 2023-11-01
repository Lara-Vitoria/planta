import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://192.168.96.112:3333',
    }
);

export default api;