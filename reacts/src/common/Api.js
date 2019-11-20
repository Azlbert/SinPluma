import axios from 'axios';

export const baseURL = 'http://sinpluma.io/api/';

const api = axios.create({
    baseURL
});

const MAX_REQUESTS_COUNT = 20
const INTERVAL_MS = 20
let PENDING_REQUESTS = 0

api.interceptors.request.use(
    function (config) {
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
                    PENDING_REQUESTS++;
                    clearInterval(interval);
                    resolve(config);
                };
            }, INTERVAL_MS);
        });
    }
);

api.interceptors.response.use(
    function (response) {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        return Promise.resolve(response);
    },
    function (error) {
        const {response} = error;
        if (isTokenExpiredError(response)) {
            return resetTokenAndReattemptRequest(error);
        }
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        return Promise.reject(error);
    }
);

function isTokenExpiredError(errorResponse) {
    let token_expire = '';
    try {
        token_expire = errorResponse.data.msg;
        //token_expire = (JSON.stringify(errorResponse)).data.msg;
    } catch(e) {
        return false;
    }

    return token_expire === 'Token has expired';
}

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

async function resetTokenAndReattemptRequest(error) {
    try {
        const { response: errorResponse } = error;
        //const resetToken = await TokenUtils.getResetToken(); // Your own mechanism to get the refresh token to refresh the JWT token
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return Promise.reject(error);
        }
        /* Proceed to the token refresh procedure
        We create a new Promise that will retry the request,
        clone all the request configuration from the failed
        request in the error object. */
        const retryOriginalRequest = new Promise(resolve => {
            addSubscriber(access_token => {
                errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                resolve(axios(errorResponse.config));
                //console.log(access_token);
            });
        });
        
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            
            const response = await api.post('/refresh',null, {
                headers: {
                    'Authorization': 'Bearer ' + refreshToken,
                }
            });
            /* console.log('Trying to get the new token ' + refreshToken);
            console.log(response.data.access_token); */
            if (!response.data) {
                return Promise.reject(error);
            }
            
            
            const newToken = response.data.access_token;
            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(newToken);
        }
        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}

function onAccessTokenFetched(access_token) {
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export default api;