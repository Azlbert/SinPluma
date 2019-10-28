import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import worksReducer from './worksReducer';
import workReducer from './workReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import accountReducer from './accountReducer';
import genreReducer from './genreReducer';
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import pageReducer from './pageReducer';
import sentimentReducer from './sentimentReducer';

export default combineReducers({
    form: formReducer,
    works: worksReducer,
    work: workReducer,
    account: accountReducer,
    user: userReducer,
    users: usersReducer,
    genres: genreReducer,
    theme: themeReducer,
    page: pageReducer,
    sentiments: sentimentReducer,
    auth: authReducer
});