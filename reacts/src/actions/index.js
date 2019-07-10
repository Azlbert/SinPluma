import _ from 'lodash';
import jsonBooks from "../apis/jsonBooks";

export const fetchWorksAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchWorks());
    
    _.chain(getState().works)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchWorks = () => {
    return async dispatch => {
        const response = await jsonBooks.get('/posts');
        dispatch({
            type: 'FETCH_WORKS',
            payload: response.data
        });
    }
};

export const fetchUser = id => {
    return async dispatch => {
        const response = await jsonBooks.get('/users/' + id);
        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
    }
};