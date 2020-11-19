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

const App = () => {
  const [token, setToken] = React.useState(null);
  
  const handleSetToken = (data) => {
		localStorage.setItem('token', JSON.stringify(data));
		setToken(data);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setToken(null);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login handleLogin={(token) => handleSetToken(token)}/>
          </Route>
          { JSON.parse(localStorage.getItem('token')) &&
            <Route path="/home" exact>
              <Home handleLogout={handleLogout}/>
            </Route>
          }
          { JSON.parse(localStorage.getItem('token'))
            ? <Redirect to="/home" />
            : <Redirect to="/login" />
          }
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
