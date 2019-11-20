export default (state = null, action) =>{
    switch (action.type) {
        case 'FETCH_WORK_IMAGE':
            state = null;
            state = action.payload;
            //return state;
            return state;
        case 'CLEAR_WORK_IMAGE':
            state = null;
            return state;
        default:
            return state;
    }
};