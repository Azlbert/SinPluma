import React from "react";
import { AppBar as MUIAppBar, Toolbar ,Typography,IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function AppBar(props){
    return (
        <MUIAppBar className={props.className}>
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        //className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography variant="h6" noWrap>
                    Responsive drawer
                </Typography>
            </Toolbar>
        </MUIAppBar>
    );
};

export default AppBar;