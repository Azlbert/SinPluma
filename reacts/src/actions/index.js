import _        from 'lodash';
import api      from "../common/Api";
import {getSession}      from "../common/Session";

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
};

export const fetchUserWorks = id => async (dispatch, getState) => {
    await dispatch(fetchUserWorksList(id));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
};

export const fetchWorksLike = query => async (dispatch, getState) => {
    await dispatch(fetchWorksListLike(query));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
};

const fetchWorksList = () =>  async dispatch => {
    const response = await api.get('/notebooks/');
    
    dispatch({
        type: 'FETCH_WORKS',
        payload: response.data.notebooks
    });
};

export const fetchUserReadings = id => async (dispatch, getState) => {
    await dispatch(fetchReadigsList(id));
    
    _.chain(getState().works)
        .map('genre_id')
        .uniq()
        .forEach(genre_id => dispatch(fetchGenre(genre_id)))
        .value();
};

const fetchReadigsList = user_id =>  async dispatch => {
    const response = await api.get('/user/' + user_id + '/readings');
    console.log(response.data);
    
    dispatch({
        type: 'FETCH_READINGS',
        payload: response.data.readings
    });
};

const fetchUserWorksList = id => async dispatch => {
    const response = await api.get('/user/' + id +'/notebooks');
    console.log(response.data);
    
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

export const fetchGenres = () => async dispatch => {
    const response = await api.get('/genres/');

    dispatch({
        type: 'FETCH_GENRES',
        payload: response.data.genres
    });
};

export const createWork = data => async (dispatch,getState) => {
    try{
        const myJSON = JSON.stringify({
            title: data['title'],
            resume: data['resume'],
            user_id: getState().account.id,
            genre_id: data['genre'],
        });
        const response = await api.post('/notebooks/', myJSON, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch(error){
        console.log(error);
    };
};

export const updateWork = data => async dispatch => {
    try{
        const myJSON = JSON.stringify({
            title: data['title'],
            resume: data['resume'],
            user_id: 2,
            genre_id: data['genre'],
        });
        console.log(myJSON);
        const response = await api.put('/notebooks/'+data['notebook'], myJSON, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        dispatch(fetchWork(data['notebook']))
        console.log(response);
    } catch(error){
        console.log(error);
    };
};

export const createPage = id => async dispatch => {
    try{
        const myJSON = JSON.stringify({
            notebook_id: id,
            title: "",
            content: "",
        });
        await api.post('/pages/', myJSON, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        dispatch(fetchWork(id))
    } catch(error){
        console.log(error);
    };
};

export const deletePage = (pageId,notebookId) => async dispatch => {
    try{
        await api.delete('/pages/'+pageId);
        dispatch(fetchWork(notebookId))
    } catch(error){
        console.log(error);
    };
};

export const deleteWork = (notebookId) => async dispatch => {
    try{
        await api.delete('/notebooks/'+notebookId);
        dispatch(fetchWork(notebookId))
    } catch(error){
        console.log(error);
    };
};

export const fetchUser = id => async dispatch => {
    const response = await api.get('/user/' + id);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
    //console.log(response);
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
};

export const fetchExactReading = (userId, workId) => async dispatch => {
    let response = await api.get('/readings?user=' + userId + '&notebook='+workId);
    console.log(response);
    dispatch({
        type: "SAVE_READING",
        payload: response.data
    });
}

export const saveReading = notebook => async dispatch => {
    let response=null;
    try{
        const myJSON = JSON.stringify({ notebook });
        response = await api.post('/readings', myJSON, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json',
            }
        });
        
        dispatch(fetchExactReading(getSession().id,notebook));
    } catch(error){
        /* dispatch({
            type: AUTHENTICATION_ERROR,
            payload: error.response.data
        }); */
        console.log(error.response.data);
    };
};

export const deleteReading = () => async (dispatch,getState) => {
    let response=null;
    try{
        response = await api.delete('/readings/' + getState().saveReading.data.reading_id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            }
        });
        dispatch({
            type: 'CLEAR_SAVE_READING',
        });
    } catch(error){
        console.log(error.response.data);
    };
};

export const registerUser = data => async dispatch => {
    let response=null;
    try{
        const myJSON = JSON.stringify({
            first_name:     data['firstname'],
            last_name:      data['lastname'],
            user_name:      data['username'],
            email:          data['email'],
            password_hash:  data['password']
        });
        response = await api.post('/register', myJSON, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if(response['status'] === 201){
            dispatch({ type: USER_CREATED });
        };
    } catch(error){
        dispatch({
            type: AUTHENTICATION_ERROR,
            payload: error.response.data
        });
    };
};


export function setTheme(theme) {
    return {
      type: 'SET_THEME',
      theme
    };
};

export function clearStates() {
    return function(dispatch) {
        dispatch({
            type: 'CLEAR_WORKS',
        });
        dispatch({
            type: 'CLEAR_READINGS',
        });
        dispatch({
            type: 'CLEAR_SAVE_READING',
        });
        dispatch({
            type: 'CLEAR_WORK',
        });
        dispatch({
            type: 'CLEAR_PAGE',
        });
        dispatch({
            type: 'CLEAR_SENTIMENT',
        });
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
            url = '/lin/sentiment?key='+element.key+'&sentence='+element.sentence.trim();
            req.push(api.get(url));
        });
        await Promise.all(req).then(_req=> {
            _req.forEach((element,id) =>{
                // TODO: Check if any problem asigning by id
                sentences[id].conf.type = element.data.sentiment;
            });
        });
    }
    dispatch({
        type: 'FETCH_SENTIMENT',
        payload: sentences
    });
};