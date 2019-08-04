import _ from 'lodash';
import sinPluma from "../apis/jsonSinPluma";

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
        const response = await sinPluma.get('/works/');
        dispatch({
            type: 'FETCH_WORKS',
            payload: response.data.books
        });
    }
};

export const fetchUser = id => {
    return async dispatch => {
        const response = await sinPluma.get('/user/' + id);
        dispatch({
            type: 'FETCH_USER',
            payload: response.data.item
        });
    }
};