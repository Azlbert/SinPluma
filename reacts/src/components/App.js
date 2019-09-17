import React from 'react';
import Template from './Template';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontSize: 16,
  },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Template />
        </ThemeProvider>
      );
};

export default App;