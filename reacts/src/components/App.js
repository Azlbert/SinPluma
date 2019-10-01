import React          from 'react';
import Template       from './Template';
import { connect }    from 'react-redux';
import CssBaseline    from '@material-ui/core/CssBaseline';
import ThemeProvider  from '@material-ui/styles/ThemeProvider';

import { BrowserRouter, Route/* , Link */ } from "react-router-dom";

import Writer         from "./Pages/Writer";
import Cards          from "./Pages/Cards";
import LoginPage      from "./Pages/Login";
import Profile        from "./Pages/Profile";
import Work        from "./Pages/Work";

// TODO: Refactor routes

const App = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Route path="/" exact component={LoginPage} />
                <Route path="/writer/" component={WriterPage} />
                <Route path="/cards/" component={CardsPage} />
                <Route path="/login/" component={LoginPage} />
                <Route path="/profile/" component={ProfilePage} />
                <Route path="/obra/" component={WorkPage} />
                <Route path="*" render={()=>'Oh, not found, baby'} />
            </BrowserRouter>
        </ThemeProvider>
    );
};

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