import React from 'react';
// eslint-disable-next-line
import WorkList from './WorkList';
// eslint-disable-next-line
import TopBar from './TopBar';
// eslint-disable-next-line
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Login from './Login'

const App = () => {
    //return <Button />;
    return (
        <div>
          <TopBar />
          <br />
          <Grid container
            justify="space-between"
            alignItems="flex-start">
            <Login />
          </Grid>
        </div>
      );
};

export default App;