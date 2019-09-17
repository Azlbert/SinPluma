import React from "react";
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class WorkCard extends React.PureComponent {
    constructor(){
        super();
        this.classes = makeStyles({
            card: {
                minWidth: 275,
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 12,
            },
        });
    }

    card(work, user){
        return (
            <Card className={this.classes.card}>
            <CardContent>
                <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                    Work of the day
                </Typography>
                <Typography variant="h5" component="h2">
                    {work.title}
                </Typography>
                <Typography className={this.classes.pos} color="textSecondary">
                    {user.name}
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        )
    }

    render() {
        let { user, work } = this.props;
        if(!user){
            user = {name: 'None'};
        }
        //return <b>{user.name}</b>;
        return this.card(work, user);
    };
};

const mapStateToProps = (state, ownProps) => ({
    user: state.users.find(user => user.id === ownProps.work.userId)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkCard);