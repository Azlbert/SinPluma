import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from '../../common/Style';

import { connect } from 'react-redux';
import { loadPage, savePage } from '../../actions';
import WriterEditor from './Editor';

function Writer(props) {
    useState(() => {
        props.loadPage(props.id);
    });
    const classes = useStyles.writer();
    
    if(props.page === null){
        return '';
    }

    return (
        <Grid container className={classes.root} alignItems="center" justify="center">
            <Grid item xs={12} md={8}>
                <Typography margin="normal" component="h2" variant="display2" gutterBottom className={classes.title} style={{marginBottom:'24px',marginTop:'35px'}}>
                    {props.page.title}
                </Typography>
                <Paper>
                    {/* <Write page={props.page} save={props.savePage} id={props.id}/> */}
                    <WriterEditor className={classes.input} id={props.id} readOnly={true}/>
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