import axios from 'axios';

const api = axios.create({
    baseURL: 'http://sinpluma.io/api/'
});

const MAX_REQUESTS_COUNT = 20
const INTERVAL_MS = 20
let PENDING_REQUESTS = 0

api.interceptors.request.use(function (config) {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
                PENDING_REQUESTS++
                clearInterval(interval)
                resolve(config)
            } 
        }, INTERVAL_MS)
    });
});

api.interceptors.response.use(function (response) {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
        return Promise.resolve(response)
    }, function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.reject(error)
});

export default api;