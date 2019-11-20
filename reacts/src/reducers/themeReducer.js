import {orangeTheme, 
    purpleTheme, 
    greenTheme,
    bluegreyTheme} from "../components/MuiTheme";

const getTheme = theme => {
    //console.log(theme);
    switch(theme){
        case 'purple':
            return purpleTheme;
        case 'green':
            return greenTheme;
        case 'bluegrey':
            return bluegreyTheme;
    }
    localStorage.setItem('theme',orangeTheme);
    return orangeTheme;
}

const defaultTheme = defaultTheme =>{
    console.log('called');
    const l = localStorage.getItem('theme');
    if(l != null && l != undefined){
        return getTheme(l);
    }
    localStorage.setItem('theme',defaultTheme);
    return defaultTheme;
}

export default (state = defaultTheme(orangeTheme), action) => {
    switch (action.type) {
        case 'SET_THEME':
            state = getTheme(action.theme);
            localStorage.setItem('theme',action.theme);
            return state;
        default:
            console.log('from default');
            return state;
    };
};