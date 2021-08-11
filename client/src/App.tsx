import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import Dashboard from './components/dashboard/Dashboard';
import VisitedPlaces from './components/visited_place/VisitedPlaces';
import SocialInteractions from './components/social_interaction/SocialInteractions';
import NotFound from './components/misc/NotFound';
import './App.css';
import styles from './App.styles';

const App = () => {
  const classes = makeStyles(styles)();

  return (
    <Container disableGutters className={classes.root} maxWidth="md">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/visited">
            <VisitedPlaces />
          </Route>
          <Route exact path="/social">
            <SocialInteractions />
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
