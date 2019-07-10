export default (state = [], action) =>{
    switch (action.type) {
        case 'FETCH_WORKS':
            return action.payload;
        default:
            return state;
    }
};