import React          from 'react';
import Template       from './Template';
import { connect }    from 'react-redux';
import CssBaseline    from '@material-ui/core/CssBaseline';
import ThemeProvider  from '@material-ui/styles/ThemeProvider';

import { BrowserRouter, Switch, Route/* , Link */ } from "react-router-dom";

import requireAuth    from './hoc/requiere_auth';
import noRequireAuth  from './hoc/no_require_auth';

import { loadSession, getSession } from '../common/Session';

import Writer         from "./Pages/Writer";
import Cards          from "./Pages/Cards";
import LoginPage      from "./Pages/Login";
import Profile        from "./Pages/Profile";
import Work           from "./Pages/Work";
import CreateWork     from "./Pages/CreateWork";
import SignUp         from "./Pages/SignUp";
import SignOut        from './SignOut'

import routes         from "../common/Routes";

// TODO: Refactor routes

const App = (props) => {
    props.loadSession();
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    {/* TODO: Refactor route path */}
                    <Route path={routes.root} exact component={noRequireAuth(LoginPage)} />
                    <Route path={routes.writer+":id"} component={requireAuth(WriterPage)} />
                    <Route path={routes.writer} component={requireAuth(WriterPage)} />
                    <Route path={routes.cards} component={requireAuth(CardsPage)} />
                    <Route path={routes.login} component={noRequireAuth(LoginPage)} />
                    <Route path={routes.profile+":id"} component={requireAuth(ProfilePage)} />
                    <Route path={routes.profile} component={requireAuth(ProfilePage)}/>
                    <Route path={routes.work+":id"}  component={requireAuth(WorkPage)} />
                    <Route path={routes.work}  component={requireAuth(WorkPage)} />
                    <Route path={routes.createWork} component={requireAuth(CreateWorkPage)} />
                    <Route path={routes.signout} component={requireAuth(SignOut)} />
                    <Route path={routes.signout} component={noRequireAuth(SignUp)} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const NotFound = () => {
    return 'Oh, not found, baby!';
}

const WriterPage = (props) => {
    let { params: { id } } = props.match;
    if(!id) id = 24;
    return (
        <Template>
            <Writer id={id}/>
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

const ProfilePage = (props) => {
    let { params: { id } } = props.match;
    if(!id) id = getSession().id;
    return (
        <Template>
            <Profile id={id}/>
        </Template>
    );
};

const WorkPage = (props) => {
    let { params: { id } } = props.match;
    if(!id) id = 2;
    return (
        <Template>
            <Work id={id}/>
        </Template>
    );
};

const CreateWorkPage = (props) => {
    return (
        <Template>
            <CreateWork/>
        </Template>
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme
});

export default connect(mapStateToProps,{loadSession})(App);