import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import useStyles from "../Style";

// TODO: Refactor Profile
// TODO: Correct resizing

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

function DisabledTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <LinkTab label="Publicaciones" {...a11yProps(0)} />
        <LinkTab label="Leyendo" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Page One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
    </Paper>
  );
}
export default function Profile() {
    const classes = useStyles.profile();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
                <Avatar alt="Remy Sharp" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" className={classes.avatar}/>
                <Typography variant="h5" gutterBottom>
                    Maria la que no queria
                </Typography>
                <Typography variant="body2" gutterBottom>
                    "Data algo mas."
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Se unio el 
                </Typography>
                <br />
            </Paper>
            </Grid>
            <Grid item xs={12} md={9} className={classes.info}>
                <DisabledTabs/>
            </Grid>
        </Grid>
    );
};
