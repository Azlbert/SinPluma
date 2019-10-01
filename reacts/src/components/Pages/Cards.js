import React from "react";

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

import useStyles from '../Style'

function WorkCard() {
    const classes = useStyles.workCard();
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
                                Post title
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Post date
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                Post description
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
  

export default function Cards() {
    const classes = useStyles.workCard();
    return(
        <React.Fragment>
        <Grid container className={classes.heroContent} justify="center">
            <CustomizedInputBase />
        </Grid>
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
                <WorkCard />
            </Grid>
        </Container>
        </React.Fragment>
    );
};
