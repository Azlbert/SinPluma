// TODO: Move to action

import api from "../common/Api";

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const USER_CREATED = 'user_created';

function startSession({email, password}, history) {
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
            // TODO: Create config file for the path names.
            history.push('/cards');
        } catch(e){
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
        }
    };
};

export default startSession;