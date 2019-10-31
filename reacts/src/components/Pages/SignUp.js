import React            from 'react';
import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Grid             from '@material-ui/core/Grid';
import Box              from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography       from '@material-ui/core/Typography';
import { makeStyles }   from '@material-ui/core/styles';
import Container        from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter }   from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect }          from 'react-redux';
import routes from "../../common/Routes";
import {registerUser}       from '../../actions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        Sin Pluma
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props) {
    if (props.userCreated) {
        setTimeout(() => goToLogin(), 4000);
    }
    const classes = useStyles();

    const goToLogin = () => props.history.push(routes.login);

    // TODO: URGENT! Solve onSubmint async error
    const onSubmit = (formValues) => {
        props.registerUser(formValues);
    };

    const errorMessage = () => {
        if (props.errorMessage) {
            let errorMsg = '';
            for(var c in props.errorMessage){
                errorMsg += props.errorMessage[c] + '\n';
            }
            console.log(errorMsg);
            return (
                <div>
                    {errorMsg}
                </div>
            );
        }
    };

    const renderFirstName = ({input}) => {
    return(<TextField
        autoComplete="fname"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label="First Name"
        autoFocus
        {...input}
    />);
    };

    const renderLastName = ({input}) => {
    return(<TextField
        variant="outlined"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        {...input}
    />);
    };

    const renderUsername = ({input}) => {
    return(<TextField
        variant="outlined"
        required
        fullWidth
        id="user_name"
        label="Username"
        name="user_name"
        autoComplete="user_name"
        {...input}
    />);
    };

    const renderEmail = ({input}) => {
    return(<TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        {...input}
    />);
    };

    const renderPassword = ({input}) => {
    return(<TextField
        variant="outlined"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...input}
    />);
    };

    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Comienza a escribir...
        </Typography>
        <form className={classes.form}  onSubmit={props.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Field name="firstname" component={renderFirstName}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Field name="lastname" component={renderLastName}/>
            </Grid>
            <Grid item xs={12}>
                <Field name="username" component={renderUsername}/>
            </Grid>
            <Grid item xs={12}>
                <Field name="email" component={renderEmail}/>
            </Grid>
            <Grid item xs={12}>
                <Field name="password" component={renderPassword}/>
            </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Registar
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
                <Link href="" variant="body2" onClick={goToLogin}>
                    Iniciar sesión
                </Link>
            </Grid>
            </Grid>
        </form>
        {errorMessage()}
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
        <Dialog
            open={props.userCreated}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¡Usuario creado!
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Redirigiendo al inicio de sesión.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={goToLogin} color="primary" autoFocus>
                Ir al inicio de sesión
            </Button>
            </DialogActions>
        </Dialog>
    </Container>
    );
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        userCreated: state.auth.userCreated
    };
}

const reduxFormSignup = reduxForm({
    form: 'signup'
})(withRouter(SignUp));

export default connect(mapStateToProps, {registerUser})(reduxFormSignup);