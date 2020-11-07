import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

import Login from "./pages/Login";
import Home from "./pages/Home";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#353736',
    },
    secondary: {
			main: '#E9EBE6',
		},
	},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/home" component={Home} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
