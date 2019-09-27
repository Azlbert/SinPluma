import {orangeTheme as MuiTheme} from "../components/MuiTheme";

export default (state = MuiTheme, action) => {
    switch (action.type) {
        case 'SET_THEME':
            state = action.theme;
            return state;
        default:
            return state;
    };
};