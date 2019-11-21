import createMuiTheme   from '@material-ui/core/styles/createMuiTheme';
import purple           from '@material-ui/core/colors/purple';
import orange           from '@material-ui/core/colors/orange';
import green            from '@material-ui/core/colors/green';
import blueGrey         from '@material-ui/core/colors/blueGrey';
import pink             from '@material-ui/core/colors/pink';
import indigo           from '@material-ui/core/colors/indigo';
import lightBlue        from '@material-ui/core/colors/lightBlue';
import amber            from '@material-ui/core/colors/amber';

export const darkTheme = createMuiTheme({
    ...global,
    palette: {
        primary: pink,
    },
});

export const purpleTheme = createMuiTheme({
    ...global,
    palette: {
        primary: purple,
    },
});

export const amberTheme = createMuiTheme({
    ...global,
    palette: {
        primary: amber,
    },
});

export const indigoTheme = createMuiTheme({
    ...global,
    palette: {
        primary: indigo,
    },
});

export const lightBlueTheme = createMuiTheme({
    ...global,
    palette: {
        primary: lightBlue,
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