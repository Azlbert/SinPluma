import React, { useEffect }  from "react";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { connect } from 'react-redux';
import { fetchWorks } from '../../actions';
import useStyles from '../Style'

function WorkCard(props) {
    const classes = useStyles.workCard();
    if (typeof props.genre === 'undefined')
        return '';
    const id = props.work.genre_id;
    console.log(props.genre)
    return(
        <Grid item xs={12} lg={6} xl={4}>
            <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                    <Hidden xsDown>
                        <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                        />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {props.work.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                -> {props.genre[props.work.genre_id]}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {props.work.resume}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    )
    
};

function CustomizedInputBase() {
    const classes = useStyles.searchbar();
  
    return (
      <Paper className={classes.root} elevation={2}>
        <InputBase
          className={classes.input}
          placeholder="Buscar en Sin Pluma"
          inputProps={{ 'aria-label': 'Buscar en Sin Pluma' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
};
  
function ListCards(props) {
    return props.cards.map(card => 
        <WorkCard key={card.notebook_id} work={card} genre={props.genres}/>
    );
};

function Cards(props) {
    useEffect(() => {
        props.fetchWorks();
    },[]);
    const classes = useStyles.workCard();
    if(Object.keys(props.works).length === 0){
        return '';
    }
    return(
        <React.Fragment>
        <Grid container className={classes.heroContent} justify="center">
            <CustomizedInputBase />
        </Grid>
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                <ListCards cards={props.works} genres={props.genres}/>
            </Grid>
        </Container>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    works: state.works,
    genres: state.genres
});

const mapDispatchToProps = {
    fetchWorks: fetchWorks
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Cards);