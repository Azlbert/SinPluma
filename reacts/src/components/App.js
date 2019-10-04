import React          from 'react';
import Template       from './Template';
import { connect }    from 'react-redux';
import CssBaseline    from '@material-ui/core/CssBaseline';
import ThemeProvider  from '@material-ui/styles/ThemeProvider';

import { BrowserRouter, Switch, Route/* , Link */ } from "react-router-dom";

import requireAuth from './hoc/requiere_auth';
import noRequireAuth from './hoc/no_require_auth';

import Writer         from "./Pages/Writer";
import Cards          from "./Pages/Cards";
import LoginPage      from "./Pages/Login";
import Profile        from "./Pages/Profile";
import Work           from "./Pages/Work";

import SignOut        from './SignOut'

// TODO: Refactor routes

const App = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/writer/" component={requireAuth(WriterPage)} />
                    <Route path="/cards/" component={requireAuth(CardsPage)} />
                    <Route path="/login/" component={noRequireAuth(LoginPage)} />
                    <Route path="/profile/" component={requireAuth(ProfilePage)} />
                    <Route path="/obra/" component={requireAuth(WorkPage)} />
                    <Route path="/signout/" component={requireAuth(SignOut)} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const NotFound = () => {
    return 'Oh, not found, baby!';
}

const WriterPage = () => {
    return (
        <Template>
            <Writer />
        </Template>
    );
};

const CardsPage = () => {
    return (
        <Template>
            <Cards />
        </Template>
    );
};

const ProfilePage = () => {
    return (
        <Template>
            <Profile />
        </Template>
    );
};

const WorkPage = () => {
    return (
        <Template>
            <Work />
        </Template>
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(App);