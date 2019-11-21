import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchUser, fetchUserWorks, fetchUserReadings } from '../../actions';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import WorkCard from '../Elements/WorkCard';
import useStyles from '../../common/Style';

// TODO: Refactor Profile
// TODO: Correct resizing

function ListWorks(props) {
    return props.cards.map((card) => 
        <WorkCard key={card.notebook_id} work={card} lg={12} xl={12}/>
    );
};

function ListReadings(props) {
    return props.readings.map((readings) => 
        <WorkCard key={readings.notebook.notebook_id} work={readings.notebook} lg={12} xl={12}/>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
    >
        <Box p={3}>{children}</Box>
    </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
            event.preventDefault();
            }}
            {...props}
        />
    );
}

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}


function UserTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  
    /* const works = typeof props.works != 'object' ? props.works : [];
    console.log(works); */
    return (
    <Paper square>
        <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
        >
            <LinkTab label="Obras" {...a11yProps(0)} />
            <LinkTab label="Leyendo" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <Grid container spacing={4}>
                <ListWorks cards={props.works} />
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Grid container spacing={4}>
                <ListReadings readings={props.readings} />
            </Grid>
        </TabPanel>
    </Paper>
    );
}


function Profile(props) {
    const classes = useStyles.profile();
    useState(() => {
        props.fetchUser(props.id);
        props.fetchUserReadings(props.id);
        props.fetchUserWorks(props.id);
    });
    let name, userName, userCreated, works, readings;
    try{
        name = props.user.last_name + " " + props.user.first_name;
        userName = props.user.user_name;
        userCreated = props.user.user_created.substring(0, 10);
        works = Array.isArray(props.works) ? props.works : [];
        readings = Array.isArray(props.readings) ? props.readings : [];
    }catch(_){
        return '';
    }
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
                <Avatar alt="Remy Sharp" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" className={classes.avatar}/>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    @{userName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Se unio el {userCreated}
                </Typography>
                <br />
            </Paper>
            </Grid>
            <Grid item xs={12} md={9} className={classes.info}>
                <UserTabs works={works} readings={readings}/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    works: state.works,
    readings: state.readings
});

const mapDispatchToProps = {
    fetchUser: fetchUser,
    fetchUserWorks: fetchUserWorks,
    fetchUserReadings: fetchUserReadings
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));