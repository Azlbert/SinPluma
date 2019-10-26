import React from "react";
import { withRouter } from 'react-router';


import { List, ListItem, ListItemIcon, ListItemText, Hidden,Drawer } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import BookIcon from '@material-ui/icons/Book';

import useStyles from '../../common/Style';

function NavBar(props) {
    const {mobileOpen, handleDrawerToggle, containera} = props;
    const classes = useStyles.template();

    return (
        <React.Fragment>
            <Hidden mdUp>
                <Drawer
                    container={containera}
                    variant="temporary"
                    open={mobileOpen()}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <div className={classes.toolbarIcon}>
                        Sin Pluma
                    </div>
                    <Menu {...props} />
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open
                >
                    <div className={classes.toolbarIcon}>
                        Sin Pluma
                    </div>
                    <Menu {...props}/>
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
};

const menuList = [
    {
        text: 'Buscar',
        icon: <SearchIcon />,
        link: "/cards/"
    },
    {
        text: 'Perfil',
        icon: <AccountIcon />,
        link: "/perfil/"
    },
    {
        text: 'Obra',
        icon: <BookIcon />,
        link: "/obra/"
    },
    {
        text: 'Editor',
        icon: <CreateIcon />,
        link: "/writer/"
    },
    {
        text: 'Login',
        icon: <PowerIcon />,
        link: "/signout/"
    },
];

function Menu(props){
    return(
        <List>
            {menuList.map((item,index) => (
            <ListItem button key={index} onClick={() => props.history.push(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItem>
            ))}
        </List>
    );
};

export default withRouter(NavBar);