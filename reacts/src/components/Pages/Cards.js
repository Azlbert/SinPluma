import React, { useState }  from "react";

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchWorksLike } from '../../actions';
import useStyles from '../../common/Style';

import WorkCard from '../Elements/WorkCard';

function CustomizedInputBase(props) {
    const classes = useStyles.searchbar();
    const [query, setQuery] = useState('');
    return (
        <Paper className={classes.root} elevation={2}>
            <InputBase
                className={classes.input}
                placeholder="Buscar en Sin Pluma"
                inputProps={{ 'aria-label': 'Buscar en Sin Pluma' }}
                onKeyUp={(event)=> {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            props.fetchWorks(query);
                            return;
                        }
                        setQuery(event.target.value);
                    }
                }
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="search" onClick={(event)=> {
            props.fetchWorks(query);
            }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
  
function ListCards(props) {
    return props.cards.map((card) => 
        <WorkCard key={card.notebook_id} work={card}/>
    );
};

function Cards(props) {
    const classes = useStyles.workCard();
    const works = Object.keys(props.works).length === 0 ? [] : props.works;
    return(
        <React.Fragment>
        <Grid container className={classes.heroContent} justify="center">
            <CustomizedInputBase fetchWorks={props.fetchWorksLike}/>
        </Grid>
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                <ListCards cards={works}/>
            </Grid>
        </Container>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    works: state.works,
});

const mapDispatchToProps = {
    fetchWorksLike: fetchWorksLike
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cards));