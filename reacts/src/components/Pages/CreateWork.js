import React            from 'react';
import Button           from '@material-ui/core/Button';
import CssBaseline      from '@material-ui/core/CssBaseline';
import TextField        from '@material-ui/core/TextField';
import Link             from '@material-ui/core/Link';
import Grid             from '@material-ui/core/Grid';
import Typography       from '@material-ui/core/Typography';
import { makeStyles }   from '@material-ui/core/styles';
import Container        from '@material-ui/core/Container';
import InputLabel       from '@material-ui/core/InputLabel';
import MenuItem         from '@material-ui/core/MenuItem';
/* import FormHelperText   from '@material-ui/core/FormHelperText'; */
import FormControl      from '@material-ui/core/FormControl';
import Select           from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter }   from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect }          from 'react-redux';
import {createWork}       from '../../actions'

import { fetchGenres } from '../../actions';

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

function CreateWork(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
        name: '',
      });

    
    React.useEffect(() => {
        props.fetchGenres();
    });

    const handleChange = event => {
        console.log(event.target.value);
        setValues(() => ({
        name: event.target.value,
        }));
    };

    // TODO: URGENT! Solve onSubmint async error
    const onSubmit = formValues => {
        props.createWork(formValues);
        setOpen(true);
    };

    const errorMessage = () => {
        if (props.errorMessage) {
            let errorMsg = '';
            for(var c in props.errorMessage){
                errorMsg += props.errorMessage[c] + '\n';
            }
            //console.log(errorMsg);
            return (
                <div>
                    {errorMsg}
                </div>
            );
        }
    };

    const renderTitle = ({input}) => {
    return(<TextField
        name="title"
        variant="outlined"
        required
        fullWidth
        id="title"
        label="Titulo"
        autoFocus
        {...input}
    />);
    };

    const renderResume = ({input}) => {
    return(<TextField
        variant="outlined"
        fullWidth
        id="resume"
        label="Sinopsis"
        name="resume"
        multiline={true}
        rows={2}
        rowsMax={6}
        {...input}
    />);
    };

    const renderGenre = ({input}) => {
        return(
            <FormControl variant="outlined" fullWidth required >
                <InputLabel htmlFor="outlined-age-simple">
                    Genero
                </InputLabel>
                <Select
                    value={values.name}
                    onChange={handleChange}
                    labelWidth={95}
                    inputProps={{
                        name: 'Genero',
                        id: 'outlined-age-simple',
                    }}
                    {...input}
                >
                    {
                        Object.keys(props.genres).map(key => (
                            <MenuItem value={key} key={key}>{props.genres[key]}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Crear obra
            </Typography>
            <form className={classes.form}  onSubmit={props.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Field name="title" component={renderTitle}/>
                </Grid>
                <Grid item xs={12}>
                    <Field name="genre" component={renderGenre}/>
                </Grid>
                <Grid item xs={12}>
                    <Field name="resume" component={renderResume}/>
                </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Crear obra
                </Button>
            </form>
            {errorMessage()}
            </div>
            <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Obra creada"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Su obra ha sido creada exitosamente, puede ingresar a ella desde su perfil.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => props.history.push("/perfil/"+props.account.id)} color="primary" autoFocus>
                    Ir a al perfil.
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        genres: state.genres,
        account: state.account
    };
}

const mapDispatchToProps = {
    fetchGenres: fetchGenres,
    createWork: createWork
};

const reduxFormCreateWork = reduxForm({
    form: 'createWork',
})(withRouter(CreateWork));

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormCreateWork);