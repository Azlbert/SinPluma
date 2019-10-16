import React            from 'react';
import { withRouter }   from 'react-router';
import { Field,reduxForm } from 'redux-form';
import { connect }      from 'react-redux';
import startSession     from "../../common/Session";

import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Paper            from '@material-ui/core/Paper';
import Box              from '@material-ui/core/Box';
import Grid             from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import makeStyles       from '@material-ui/core/styles/makeStyles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Sin Pluma '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO: Add style to style js file.
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Login(props) {
    const classes = useStyles();

    const goToSignUp = () => props.history.push('/registrar');

    // TODO: URGENT! Solve onSubmint async error
    const onSubmit = (formValues) => {
        props.startSession(formValues, props.history);
    };

    const errorMessage = () => {
        if (props.errorMessage) {
            return (
                <div>
                    {props.errorMessage}
                </div>
            );
        }
    };

    const renderEmail = ({input}) => {
        return(<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...input}
        />);
    };

    const renderPassword = ({input}) => {
        return(<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            {...input}
        />);
    };

    return (
    <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={props.handleSubmit(onSubmit)}>
                    <Field name="email" component={renderEmail}/>
                    <Field name="password" component={renderPassword}/>
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordar"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="" variant="body2" onClick={goToSignUp}>
                                Crear cuenta.
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                    <Copyright />
                    </Box>
                </form>
                {errorMessage()}
            </div>
        </Grid>
    </Grid>
    );
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
    form: 'login'
})(withRouter(Login));

export default connect(mapStateToProps, {startSession})(reduxFormSignin);