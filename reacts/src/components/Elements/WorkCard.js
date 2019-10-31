import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import routes from "../../common/Routes";
import useStyles from '../../common/Style';

function WorkCard(props) {
    const classes = useStyles.workCard();
    if (typeof props.genres === 'undefined')
        return '';
    const url = routes.work + props.work.notebook_id;
    const sizing = {
        xs: typeof props.xs === 'undefined' ? 12 : props.xs,
        lg: typeof props.lg === 'undefined' ? 6 : props.lg,
        xl: typeof props.xl === 'undefined' ? 4 : props.xl,
    };
    return(
        <Grid item {...sizing}>
            <CardActionArea component="a" href="" onClick={() => props.history.push(url)}>
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
                                {props.genres[props.work.genre_id]}
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
    );
};

const mapStateToProps = (state) => ({
    genres: state.genres
});

const mapDispatchToProps = {
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkCard));