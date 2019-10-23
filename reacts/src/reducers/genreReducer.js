export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_GENRE':
            state[action.payload.genre_id] = action.payload.name; 
            return Object.assign({}, state);
        default:
            return state;
    };
};