export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_GENRE':
            state[action.payload.genre_id] = action.payload.name; 
            return Object.assign({}, state);
        case 'FETCH_GENRES':
                state = {};
                action.payload.forEach(element => {
                    state[element.genre_id] = element.name; 
                });
                return Object.assign({}, state);
        default:
            return state;
    };
};