import React        from "react";
import MUIAppBar    from '@material-ui/core/AppBar';
import Toolbar      from '@material-ui/core/Toolbar';
import Typography   from '@material-ui/core/Typography';
import IconButton   from '@material-ui/core/IconButton';
import Hidden       from '@material-ui/core/Hidden';
import MenuIcon     from '@material-ui/icons/Menu';

import { connect } from 'react-redux';

function AppBar(props){
    const account = props.account;
    return (
        <MUIAppBar className={props.className}>
            <Toolbar>
                <Hidden mdUp>
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
                    {account.fname}
                </Typography>
            </Toolbar>
        </MUIAppBar>
    );
};

const mapStateToProps = (state) => ({
    account: state.account
});

const mapDispatchToProps = {
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);