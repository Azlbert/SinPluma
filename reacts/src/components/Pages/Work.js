import React, { useEffect } from 'react';
import { Field,reduxForm }  from 'redux-form';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button           from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
/* import AddIcon from '@material-ui/icons/Add'; */
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import routes from "../../common/Routes";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {    fetchWork,
            createPage,
            deletePage,
            updateWork,
            fetchGenres,
            clearStates,
            deleteWork as deleteWorkAction
        } from '../../actions';
import useStyles from '../../common/Style';

import InputLabel       from '@material-ui/core/InputLabel';
import MenuItem         from '@material-ui/core/MenuItem';
import FormControl      from '@material-ui/core/FormControl';
import Select           from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField        from '@material-ui/core/TextField';

import DrawIfAuth from '../hoc/draw_if_auth';


function Pages(props) {
    const [deletePage, setDeletePage] = React.useState(false);
    const [pageId, setPageId] = React.useState(-1);

    const openDeletePage = () => {
        setDeletePage(true);
    };

    const closeDeletePage = () => {
        setDeletePage(false);
    };
    
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Capitulo</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.pages.map((row,id) => (
                <TableRow key={id}>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right" style={{padding:'5px'}}>
                    <DrawIfAuth id={props.user.user_id}>
                    <Button
                    variant="contained"
                    size="small"
                    onClick={() => props.history.push(routes.writer+row.page_id)}
                    >
                        <Edit fontSize="small" style={{marginRight:'4px'}}/>
                        Editar
                    </Button>
                    <IconButton 
                    variant="contained"
                    aria-label="delete" 
                    style={{marginLeft:'6px'}}
                    onClick={()=>{
                        setPageId(row.page_id);
                        openDeletePage();
                        }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    </DrawIfAuth>
                </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <DrawIfAuth id={props.user.user_id}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                /* className={classes.submit} */
                onClick={() => props.createPage(props.id)}
            >
                Añadir pagina
            </Button>
        </DrawIfAuth>
        <Dialog
            open={deletePage}
            onClose={closeDeletePage}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Estas seguro de querer eliminarlo?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Esta acción es irreversible.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={closeDeletePage} color="primary" autoFocus>
                Cancelar
            </Button>
            <Button onClick={() => {
                props.deletePage(pageId,props.id);
                closeDeletePage();
                }}>
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
      </Paper>
    );
}

function Work(props) {
    const classes = useStyles.profile();
    React.useState(() => {
        props.clearStates();
        props.fetchWork(props.id);
        props.fetchGenres();
        
    });
    
    const [editWork, setEditWork] = React.useState(false);
    
    const openEditWork = () => {
//        console.log(props.work)
    props.initialize({genre:props.work.genre_id,title:props.work.title,resume:props.work.resume})
    setEditWork(true);
    };

    const closeEditWork = () => {
        setEditWork(false);
    };

    const [deleteWork, setDeleteWork] = React.useState(false);

    const openDeleteWork = () => {
        setDeleteWork(true);
    };

    const closeDeletePage = () => {
        setDeleteWork(false);
    };

    const onSubmit = (formValues) => {
        formValues['user']= props.work.user_id;
        formValues['notebook']= props.work.notebook_id;
        props.updateWork(formValues);
        closeEditWork();
    };

    const [values, setValues] = React.useState({
        name: "Terror",
    });

    const handleChange = event => {
        setValues(() => ({
        name: event.target.value,
        }));
    };

    if(Object.keys(props.work).length === 0){
        return '';
    }

    const renderTitle = ({input}) => {
        return(<TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="title"
            label="Titulo"
            autoFocus
            {...input}
        />);
    };

    const renderGenre = ({input}) => {
        return(
            <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor="outlined-age-simple">
                    Categoria
                </InputLabel>
                <Select
                    onChange={handleChange}
                    labelWidth={95}
                    inputProps={{
                        name: 'Categoria',
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

    const renderResume = ({input}) => {
        return(<TextField
            variant="outlined"
            fullWidth
            id="resume"
            margin="normal"
            label="Resumen"
            multiline={true}
            rows={2}
            rowsMax={6}
            {...input}
        />);
        };
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                    {props.work.title}
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
                <Typography variant="body2" gutterBottom>
                    Publicado por: {props.work.user.user_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Genero: {props.work.genre.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Publicado el: alguna fecha
                </Typography>
                <br />
            </Paper>
            <DrawIfAuth id={props.work.user.user_id}>
                <Button
                variant="contained"
                onClick={() => openEditWork()}
                fullWidth
                style={{marginTop:'20px'}}
                >
                    Editar Obra
                </Button>
            </DrawIfAuth>
            
            </Grid>
            <Grid item xs={12} md={9} className={classes.info}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        Sinopsis
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {props.work.resume}
                    </Typography>
                    <br />
                </Paper>
                <Typography variant="h5" gutterBottom className={classes.paper} style={{marginTop:'20px'}}>
                    Tabla de contenido
                </Typography>
                <Pages 
                    rows={props.work.pages}
                    history={props.history}
                    user={props.work.user}
                    id={props.id}
                    createPage={props.createPage}
                    deletePage={props.deletePage}
                />
            </Grid>
            <Dialog
                open={editWork}
                onClose={closeEditWork}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Editar Obra</DialogTitle>
                <form onSubmit={props.handleSubmit(onSubmit)}>
                <DialogContent>
                <DialogContentText id="alert-dialog-description" component={'span'}>
                    <Field name="title" placeholder="Number" component={renderTitle}/>
                    <Field name="genre" component={renderGenre}/>
                    <Field name="resume" component={renderResume}/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <IconButton 
                style={{marginLeft: -12}}
                position="right"
                variant="contained"
                aria-label="delete" 
                onClick={()=>{
                    openDeleteWork();
                    }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <Button onClick={closeEditWork}>
                    Cancelar
                </Button>
                <Button type="submit" color="primary" >
                    Modificar
                </Button>
                </DialogActions>
                </form>
            </Dialog>

        <Dialog
        open={deleteWork}
        onClose={closeDeletePage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Estas seguro de querer eliminar a " + props.work.title +"?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Esta acción es irreversible. Aún no contamos con los recursos para hacer respaldos.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={closeDeletePage} color="primary" autoFocus>
                Cancelar
            </Button>
            <Button onClick={() => {
                    props.deleteWorkAction(props.id);
                    props.history.push(routes.profile+props.work.user.user_id)
                }}>
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
        </Grid>
    );
};

const mapStateToProps = state => ({
    work: state.work,
    genres: state.genres,
});

const mapDispatchToProps = {
    fetchWork: fetchWork,
    fetchGenres: fetchGenres,
    createPage: createPage,
    deletePage: deletePage,
    updateWork: updateWork,
    deleteWorkAction: deleteWorkAction,
    clearStates: clearStates
};

const reduxWork = reduxForm({
    form: 'editWork'
})(withRouter(Work));

export default connect(mapStateToProps, mapDispatchToProps)(reduxWork);