// TODO: Move to action

import api from "../common/Api";

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const USER_CREATED = 'user_created';

export function startSession({email, password}, history) {
    return async (dispatch) => {
        try{
            const myJSON = JSON.stringify({
                user_name: email,
                password_hash: password
            });
            let response = await api.post('login', myJSON, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            localStorage.setItem("accessToken", response.data.access_token);
            dispatch({ type: AUTHENTICATED });
            dispatch({
                type: 'SET_ACCOUNT',
                payload: parseJwt(response.data.access_token).user_claims
            });
            history.push('/cards');
        } catch(e){
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
        }
    };
};

export function loadSession() {
    return async (dispatch) => {
        const response = localStorage.getItem("accessToken");
        console.log(response);
        if(typeof response !== 'undefined') {
            dispatch({ type: AUTHENTICATED });
            dispatch({
                type: 'SET_ACCOUNT',
                payload: parseJwt(response).user_claims
            });
            
        }
    };
};

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};