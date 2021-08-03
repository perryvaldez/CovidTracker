import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import H1 from '../markup/H1';
import DashboardButtons from './DashboardButtons';
import styles from './Dashboard.styles';
import { Box, Grid } from '@material-ui/core';
import NotificationTray from './NotificationTray';

export const Dashboard: React.FC = () => { 
  const classes = makeStyles(styles)();
  return (
    <Container disableGutters>
      <Grid container spacing={2} className={classes.header}>
        <Grid item xs={10}>
          <Box display="flex" alignItems="center" height="100%">
            <H1 className={classes.title}>COVID Exposure Tracker Tool</H1>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <NotificationTray />
          </Box>
        </Grid>
      </Grid>
      <DashboardButtons />
    </Container>
  );
};

export default Dashboard;
