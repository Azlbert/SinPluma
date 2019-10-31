export default (state = null, action) =>{
    switch (action.type) {
        case 'FETCH_SENTIMENT':
            state = action.payload;
            return state;
        case 'CLEAR_SENTIMENT':
            state = null;
            return state;
        default:
            return state;
    }
};