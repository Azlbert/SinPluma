import React        from "react";
import MUIAppBar    from '@material-ui/core/AppBar';
import Toolbar      from '@material-ui/core/Toolbar';
import Typography   from '@material-ui/core/Typography';
import IconButton   from '@material-ui/core/IconButton';
import Button       from '@material-ui/core/Button';
import Hidden       from '@material-ui/core/Hidden';
import MenuIcon     from '@material-ui/icons/Menu';

import routes from '../../common/Routes';
import DrawIfPath from '../hoc/draw_if_path';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function AppBar(props){
    const account = props.account;
    console.log(props.location);
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
                <DrawIfPath actualPath={routes.createWork}>
                    <Button variant="outlined" onClick={() => props.history.push(routes.createWork)} align='right'>
                        Crear obra
                    </Button>
                </DrawIfPath>
                <Typography variant="h6" noWrap align='right' style={{flex:1}}>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBar));