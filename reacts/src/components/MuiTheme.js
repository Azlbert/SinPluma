import createMuiTheme   from '@material-ui/core/styles/createMuiTheme';
import purple           from '@material-ui/core/colors/purple';
import orange           from '@material-ui/core/colors/orange';
import green            from '@material-ui/core/colors/green';
import blueGrey            from '@material-ui/core/colors/blueGrey';

const global = {
    typography: {
        fontSize: 16,
    },
};

export const purpleTheme = createMuiTheme({
    ...global,
    palette: {
        primary: purple,
    },
});

export const orangeTheme = createMuiTheme({
    ...global,
    palette: {
        primary: orange,
    },
});

export const greenTheme = createMuiTheme({
    ...global,
    palette: {
        primary: green,
    },
});

export const bluegreyTheme = createMuiTheme({
    ...global,
    palette: {
        primary: blueGrey,
    },
});