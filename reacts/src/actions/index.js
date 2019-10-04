import _ from 'lodash';
import api from "../common/Api";

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
        const response = await api.get('/works/');
        dispatch({
            type: 'FETCH_WORKS',
            payload: response.data.books
        });
    }
};

export const fetchUser = id => {
    return async dispatch => {
        const response = await api.get('/user/' + id);
        dispatch({
            type: 'FETCH_USER',
            payload: response.data.item
        });
    }
};

export function setTheme(theme) {
    return {
      type: SET_THEME,
      theme
    }
}