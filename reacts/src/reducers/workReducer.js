export default (state = {}, action) =>{
    switch (action.type) {
        case 'FETCH_WORK':
            state = action.payload;
            return state;
        default:
            return state;
    }
};