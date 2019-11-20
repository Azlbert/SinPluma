import React from "react";
import { withRouter } from 'react-router';
import { connect }    from 'react-redux';

import { List, ListItem, ListItemIcon, ListItemText, Hidden,Drawer } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import BookIcon from '@material-ui/icons/Book';
import ColorLens from '@material-ui/icons/ColorLens';

import routes from "../../common/Routes";
import useStyles from '../../common/Style';
import {setTheme} from '../../actions';


function ThemeSettings(props){
    return(
        <Grid container>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                    Selecciona un tema
                </Typography>
            </Grid>
            <Grid container spacing={4}>
                <Button variant="contained" onClick={() => props.setTheme('orange')}>
                    Naranja
                </Button>
                <Button variant="contained" onClick={() => props.setTheme('purple')}>
                    Morado
                </Button>
                <Button variant="contained" onClick={() => props.setTheme('green')}>
                    Verde
                </Button>
                <Button variant="contained" onClick={() => props.setTheme('bluegrey')}>
                    Azul Gris
                </Button>
            </Grid>
        </Grid>
    );
};

/* const mapStateToProps = state => ({
    auth: state.auth,
}); */

const mapDispatchToProps = {
    setTheme: setTheme
};

export default connect(null,mapDispatchToProps)(withRouter(ThemeSettings));