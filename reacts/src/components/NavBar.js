import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Hidden,Drawer } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import useStyles from "./Style";

function NavBar(props) {
    const {mobileOpen, handleDrawerToggle, containera} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <Hidden smUp>
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
                    <Menu />
                </Drawer>
            </Hidden>
            <Hidden xsDown>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open
                >
                    <Menu />
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
};

function Menu(props){
    return(
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    );
};

export default NavBar;