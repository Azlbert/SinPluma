export default (state = {}, action) =>{
    switch (action.type) {
        case 'FETCH_READINGS':
            state = action.payload;
            return state;
        case 'CLEAR_READINGS':
            state = {}
            return state;
        default:
            return state;
    }
};