import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import H1 from '../markup/H1';
import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const classes = makeStyles(styles)();
  return (
    <Container disableGutters>
      <H1 align="center" className={classes.title}>COVID Exposure Tracker Tool</H1>
    </Container>
  );
};

export default Dashboard;
