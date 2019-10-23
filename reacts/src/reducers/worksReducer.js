export default (state = {}, action) =>{
    switch (action.type) {
        case 'FETCH_WORKS':
            state = action.payload;
            return action.payload;
        default:
            return state;
    }
};