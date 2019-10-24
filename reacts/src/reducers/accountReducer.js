export default (state = [], action) => {
    switch (action.type) {
        case 'SET_ACCOUNT':
            state = action.payload;
            return state;
        default:
            return state;
    };
};