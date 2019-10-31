export default (state = {}, action) =>{
    switch (action.type) {
        case 'FETCH_WORKS':
            state = action.payload;
            return state;
        case 'CLEAR_WORKS':
            state = {}
            return state;
        default:
            return state;
    }
};