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

export const fetchUserWorks = id => async (dispatch, getState) => {
    await dispatch(fetchUserWorksList(id));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
}

export const fetchWorksLike = query => async (dispatch, getState) => {
    await dispatch(fetchWorksListLike(query));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
}

const fetchWorksList = () =>  async dispatch => {
    const response = await api.get('/notebooks/');
    
    dispatch({
        type: 'FETCH_WORKS',
        payload: response.data.notebooks
    });
};

const fetchUserWorksList = id => async dispatch => {
    const response = await api.get('/user/' + id +'/notebooks');
    console.log(response);
    
    dispatch({
        type: 'FETCH_WORKS',
        payload: response.data.notebooks
    });
};

const fetchWorksListLike = query => async dispatch => {
    const response = await api.get('/search/notebooks/'+query);
    
    dispatch({
        type: 'FETCH_WORKS',
        payload: response.data.notebooks
    });
};

export const fetchGenre = id => async dispatch => {
    const response = await api.get('/genres/' + id);
    
    dispatch({
        type: 'FETCH_GENRE',
        payload: response.data
    });
};

export const fetchUser = id => async dispatch => {
    const response = await api.get('/user/' + id);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
    console.log(response);
};

export const fetchWork = id => async dispatch => {
    const response = await api.get('/notebooks/' + id);
    response.data.user = (await api.get('/user/' + response.data.user)).data;
    response.data.genre = (await api.get('/genres/' + response.data.genre)).data;
    response.data.pages = (await api.get('/notebooks/' + id + '/pages/')).data;

    dispatch({
        type: 'FETCH_WORK',
        payload: response.data
    });
} 

export const registerUser = data => async dispatch => {
    let response=null;
    try{
        const myJSON = JSON.stringify({
            first_name: data['firstname'],
            last_name: data['lastname'],
            user_name: data['username'],
            email: data['email'],
            password_hash: data['password']
        });
        console.log(myJSON);
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
    }
};


export function setTheme(theme) {
    return {
      type: 'SET_THEME',
      theme
    };
};

export const loadPage = id => async dispatch => {
    const response = await api.get('/pages/'+id+'?mode=editor');
    dispatch({
        type: 'FETCH_PAGE',
        payload: response.data
    });
};

export const savePage = (data, id) => async (dispatch, getState) => {
    const myJSON = JSON.stringify(data);
    await api.put('/pages/'+id, myJSON, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    dispatch({
        type: 'FETCH_PAGE',
        payload: data
    });
};

export const sentiment = sentences => async dispatch => {
    if(sentences !== null){
        let req = [];
        let url = '';
        sentences.forEach(element => {
            url = '/sentiment/?key='+element.key+'&sentence='+element.sentence.trim();
            req.push(api.get(url));
        });
        let responses = []
        await Promise.all(req).then(_req=> {
            _req.forEach((element,id) =>{
                // TODO: Check if any problem asigning by id
                sentences[id].conf.type = element.data.sentiment;
            });
            //console.log(_req[0].data);
            //responses.push(_req);
        });
        //console.log(sentences);
    }
    dispatch({
        type: 'FETCH_SENTIMENT',
        payload: sentences
    });
};