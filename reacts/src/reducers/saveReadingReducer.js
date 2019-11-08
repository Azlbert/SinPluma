export default (state = null, action) => {
    switch (action.type) {
        case 'SAVE_READING':
            state = action.payload;
            return state;
        case 'CLEAR_SAVE_READING':
            state = null;
            return state;
        default:
            return state;
    };
};