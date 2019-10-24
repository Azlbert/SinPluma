import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import worksReducer from './worksReducer';
import workReducer from './workReducer';
import usersReducer from './usersReducer';
import accountReducer from './accountReducer';
import genreReducer from './genreReducer';
import themeReducer from './themeReducer';
import authReducer from './authReducer';

export default combineReducers({
    form: formReducer,
    works: worksReducer,
    work: workReducer,
    account: accountReducer,
    users: usersReducer,
    genres: genreReducer,
    theme: themeReducer,
    auth: authReducer
});