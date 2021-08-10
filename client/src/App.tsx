import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/misc/NotFound';
import styles from './App.styles';
import { Container } from '@material-ui/core';

const App = () => {
  const classes = makeStyles(styles)();

  return (
    <Container disableGutters className={classes.root} maxWidth="md">
      <Router>
        <Switch>
          <Route exact path="/">
          <Dashboard />
          </Route>
          <Route path="*">
          <NotFound />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
