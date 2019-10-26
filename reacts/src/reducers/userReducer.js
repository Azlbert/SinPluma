export default (state = null, action) =>{
    switch (action.type) {
        case 'FETCH_USER':
            state = action.payload;
            //return state;
            return state;
        default:
            return state;
    }
};