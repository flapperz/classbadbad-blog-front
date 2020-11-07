import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/home"/>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
