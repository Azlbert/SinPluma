import React          from 'react';
import Template       from './Template';
import { connect }    from 'react-redux';
import CssBaseline    from '@material-ui/core/CssBaseline';
import ThemeProvider  from '@material-ui/styles/ThemeProvider';
import Writer         from "./Pages/Writer";
import Cards          from "./Pages/Cards";
import LoginPage      from "./Pages/Login";
import { BrowserRouter as Router, Route/* , Link */ } from "react-router-dom";

const App = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <Router>
                <Route path="/" exact component={LoginPage} />
                <Route path="/writer/" component={WriterPage} />
                <Route path="/cards/" component={CardsPage} />
                <Route path="/login/" component={LoginPage} />
            </Router>
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

const mapStateToProps = (state) => ({
    theme: state.theme
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(App);