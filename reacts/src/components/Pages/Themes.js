import React from "react";
import { withRouter } from 'react-router';
import { connect }    from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {setTheme} from '../../actions';
import useStyles from '../../common/Style';


function ThemeSettings(props){
    const classes = useStyles.workCard();
    return(
        <React.Fragment>
            <Grid container className={classes.heroContent} justify="center">
                <Typography variant="h4" gutterBottom>
                    Selecciona un tema
                </Typography>
            </Grid>
            <Container maxWidth="xl">
                <Grid container spacing={4} justify="center">
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('orange')}>
                            Naranja
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('purple')}>
                            Morado
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('green')}>
                            Verde
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('bluegrey')}>
                            Azul Gris
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('dark')}>
                            Pink
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('lightblue')}>
                            Light Blue
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('indigo')}>
                            Indigo
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => props.setTheme('amber')}>
                            Amber
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

/* const mapStateToProps = state => ({
    auth: state.auth,
}); */

const mapDispatchToProps = {
    setTheme: setTheme
};

export default connect(null,mapDispatchToProps)(withRouter(ThemeSettings));