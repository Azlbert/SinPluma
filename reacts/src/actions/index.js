import _ from 'lodash';
import api from "../common/Api";

import {
    AUTHENTICATION_ERROR,
    USER_CREATED
  } from '../common/Session';

export const fetchWorks = () => async (dispatch, getState) => {
    await dispatch(fetchWorksList());
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
}

export const fetchWorksLike = (query) => async (dispatch, getState) => {
    await dispatch(fetchWorksListLike(query));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
}

const fetchWorksList = () => {
    return async dispatch => {
        const response = await api.get('/notebooks/');
        
        dispatch({
            type: 'FETCH_WORKS',
            payload: response.data.notebooks
        });
    }
};

const fetchWorksListLike = (query) => {
    return async dispatch => {
        const response = await api.get('/search/notebooks/'+query);
        
        dispatch({
            type: 'FETCH_WORKS',
            payload: response.data.notebooks
        });
    }
};

export const fetchGenre = id => {
    return async dispatch => {
        const response = await api.get('/genres/' + id);
        
        dispatch({
            type: 'FETCH_GENRE',
            payload: response.data
        });
    }
};

export const fetchWork = id => async (dispatch) => {
    const response = await api.get('/notebooks/' + id);
    response.data.user = (await api.get('/user/' + response.data.user)).data;
    response.data.genre = (await api.get('/genres/' + response.data.genre)).data;
    response.data.pages = (await api.get('/notebooks/' + id + '/pages/')).data;

    dispatch({
        type: 'FETCH_WORK',
        payload: response.data
    });
} 

export const registerUser = data => {
    return async (dispatch) => {
        let response=null;
        try{
            const myJSON = JSON.stringify({
                first_name: data['firstname'],
                last_name: data['lastname'],
                user_name: data['username'],
                email: data['email'],
                password_hash: data['password']
            });
            response = await api.post('register', myJSON, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            
            if(response['status'] === 201){
                dispatch({ type: USER_CREATED });
                console.log('Entro!')
            }
        } catch(error){
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: error.response.data
            });
            console.log('--->Error');
        }
    };
};


export function setTheme(theme) {
    return {
      type: 'SET_THEME',
      theme
    }
}

export const loadPage = id => async (dispatch, getState) => {
    const response = await api.get('/pages/'+id+'?mode=editor');
    dispatch({
        type: 'FETCH_PAGE',
        payload: response.data
    });
}

export const savePage = (data, id) => async (dispatch, getState) => {
    const page = dispatch({
        type: 'FETCH_PAGE',
        payload: data
    });

    const myJSON = JSON.stringify(data);
    await api.put('/pages/'+id, myJSON, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}