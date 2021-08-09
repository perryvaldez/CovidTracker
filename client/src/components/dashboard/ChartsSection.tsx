import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import ChartVisitedPlaces from './ChartVisitedPlaces';
import styles from './ChartsSection.styles';

export const ChartsSection = () => {
  const classes = makeStyles(styles)();

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} sm={6}>
        <Box display="flex" flexDirection="row" justifyContent="center" width="320">
          <ChartVisitedPlaces />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
