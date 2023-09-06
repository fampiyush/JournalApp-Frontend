import axios from 'axios';

const base_api_url = process.env.EXPO_PUBLIC_BASE_API_URL

const api = axios.create({
    baseURL: base_api_url
})

api.interceptors.request.use(
    (req) => {
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default api