import React from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import H1 from '../markup/H1';
import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const classes = makeStyles(styles)();
  return (
    <Container disableGutters>
      <H1 align="center" className={classes.title}>COVID Exposure Tracker Tool</H1>
      <Grid container spacing={2}>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                  <Button variant="contained" className={classes.button}>Add Social Interaction</Button>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                  <Button variant="contained" className={classes.button}>Add Place Exposure</Button>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                  <Button variant="contained" className={classes.button}>Reset Data</Button>
              </Box>
          </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
