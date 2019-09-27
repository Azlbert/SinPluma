import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Hidden,Drawer } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import useStyles from "../Style";

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
                    <Menu />
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