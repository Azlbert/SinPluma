export default (state = {}, action) =>{
    switch (action.type) {
        case 'FETCH_WORK':
            state = action.payload;
            return state;
        case 'CLEAR_WORK':
            state = {};
            return state;
        default:
            return state;
    }
};