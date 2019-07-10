import { combineReducers } from "redux";
import worksReducer from './worksReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    works: worksReducer,
    users: usersReducer
});