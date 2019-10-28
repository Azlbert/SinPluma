import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import useStyles from '../../common/Style';

import { connect } from 'react-redux';
import { loadPage, savePage } from '../../actions';
import WriterEditor from './Editor';

function Writer(props) {
    let child;
    useState(() => {
        props.loadPage(props.id);
    });
    const classes = useStyles.writer();
    
    if(props.page === null){
        return '';
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={8}>
                <TextField
                    placeholder={"Agregar un titulo"}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        classes: {
                            input: classes.title,
                        },
                    }}
                    defaultValue={props.page.title}
                    style={{marginBottom:'24px',marginTop:'35px'}}
                    onChange={event => {
                        props.page.title = event.target.value;
                        props.savePage(props.page,props.id);
                    }}
                />
                <Paper>
                    {/* <Write page={props.page} save={props.savePage} id={props.id}/> */}
                    <WriterEditor className={classes.input} id={props.id} onRef={ref => (child = ref)}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{marginBottom:'24px',marginTop:'35px',marginLeft:'24px'}}>
                    <Button variant="contained" color="primary"  onClick={() => typeof child !== 'undefined' ? child.analize() : ''}>Analizar</Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    page: state.page,
});

const mapDispatchToProps = {
    loadPage: loadPage,
    savePage: savePage
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Writer);