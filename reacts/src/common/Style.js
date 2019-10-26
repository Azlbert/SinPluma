import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 210;
const breakpoints = 'md';

const templateStyles = theme => ({
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up(breakpoints)]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        fontFamily: '"Satisfy", Times, serif',
        fontSize: '28px',
        paddingLeft: '24px'
    },
    drawer: {
        [theme.breakpoints.up(breakpoints)]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        width:'100%',
        flexGrow: 1,
        //padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
});

const workCardStyles = theme => ({
    card: {
        display: 'flex',
        height: 240
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    heroContent: {
        backgroundColor: '#F0F0F0',
        //backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 8),
        marginBottom: theme.spacing(4),
    },
});

const searchbarStyles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        width: 512,
        margin: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 8,
    },
});

const writerStyles = theme => ({
    root: {
        padding: theme.spacing(3),
    },
    input: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        minHeight: '512px',
        fontFamily: '"Montserrat",Times,serif',
        fontSize: '22px',
        color:'#505050',
    },
    title: {
        fontFamily: '"Montserrat",Times,serif',
        fontSize: '24px',
        color:'#505050',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    avatar: {
        width: 160,
        height: 160,
        margin:'auto',
        marginBottom: theme.spacing(2)
    },
});

const profileStyles = theme => ({
    root: {
        padding: theme.spacing(3),
    },
    title: {
        fontFamily: '"Montserrat",Times,serif',
        fontSize: '24px',
        color:'#505050',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    avatar: {
        width: 160,
        height: 160,
        margin:'auto',
        marginBottom: theme.spacing(2)
    },
    info: {
        paddingLeft: theme.spacing(4)
    },
});

const useStyles = {
    template:       makeStyles(templateStyles),
    workCard:       makeStyles(workCardStyles),
    searchbar:      makeStyles(searchbarStyles),
    writer:         makeStyles(writerStyles),
    profile:        makeStyles(profileStyles),
};

export default useStyles;