export default (state = null, action) =>{
    switch (action.type) {
        case 'FETCH_PAGE':
            state = action.payload;
            //return state;
            return state;
        case 'CLEAR_PAGE':
            state = null;
            return state;
        default:
            return state;
    }
};