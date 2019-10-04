import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import worksReducer from './worksReducer';
import usersReducer from './usersReducer';
import themeReducer from './themeReducer';
import authReducer from './authReducer';

export default combineReducers({
    form: formReducer,
    works: worksReducer,
    users: usersReducer,
    theme: themeReducer,
    auth: authReducer
});