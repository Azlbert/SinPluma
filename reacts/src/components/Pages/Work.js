import React, { useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchWork } from '../../actions';
import useStyles from '../../common/Style';

function SimpleTable(props) {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Capitulo</TableCell>
                <TableCell align="right"># Palabras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.pages.map((row,id) => (
                <TableRow key={id} component="a" href={""} style={{color:'rgba(0,0,0,0)'}} onClick={() => props.history.push("/writer/"+row.page_id)}>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">12</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
}

function Work(props) {
    const classes = useStyles.profile();
    useEffect(() => {
        props.fetchWork(props.id);
    });
    if(Object.keys(props.work).length === 0){
        return '';
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
                
                <Typography variant="h5" gutterBottom>
                    {props.work.title}
                </Typography>
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
                <SimpleTable rows={props.work.pages} history={props.history}/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    work: state.work
});

const mapDispatchToProps = {
    fetchWork: fetchWork
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Work));