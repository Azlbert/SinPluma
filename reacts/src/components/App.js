import React          from 'react';
import Template       from './Template';
import { connect }    from 'react-redux';
import CssBaseline    from '@material-ui/core/CssBaseline';
import ThemeProvider  from '@material-ui/styles/ThemeProvider';
import Cards          from "./Pages/Writer";

const App = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline/>
            <Template>
                <Cards />
            </Template>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(App);