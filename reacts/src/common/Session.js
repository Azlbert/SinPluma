// TODO: Move to action

import api from "../common/Api";

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

function startSession({email, password}, history) {
    if(sessionStorage.getItem("accessToken") != null) {
        console.log("Already set: " + sessionStorage.getItem("accessToken"));
        sessionStorage.clear();
        return;
    }
    return async (dispatch) => {
        try{
            const myJSON = JSON.stringify({
                username: email,
                password: password
            });
            let response = await api.post('login', myJSON, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            sessionStorage.setItem("accessToken", response.data.access_token);
            dispatch({ type: AUTHENTICATED });
            console.log("Saved!");
            // TODO: Create config file for the path names.
            history.push('/cards');
        } catch(e){
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: 'Invalid email or password'
            });
            console.log('Error');
        }
    };
};

export default startSession;