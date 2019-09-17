import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 210;

const useStyles = makeStyles(theme => ({
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
    //TODO: Fix iOS scrolling issue (it keep scrolling)
    //TODO: Fix Android scrolling issue (drawer does not update size at the end)
    fixIOS: {
        position:'fixed',
        top:'0',
        left:'0',
        right:'0',
        bottom:'0',
        overflow:'hidden'
    }
}));

export default useStyles;