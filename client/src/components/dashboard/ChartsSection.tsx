import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import ChartVisitedPlaces from './ChartVisitedPlaces';
import styles from './ChartsSection.styles';
import ChartSocialInteractions from './ChartSocialInteractions';
import { DataItem } from '../../lib/charting';

export const ChartsSection = () => {
  const classes = makeStyles(styles)();

  const socialData: DataItem[] = [
    { date: 'Jun 20', count: 2 },
    { date: 'Jun 21', count: 4 },
    { date: 'Jun 22', count: 3 },
    { date: 'Jun 23', count: 1 },
    { date: 'Jun 24', count: 3 },
    { date: 'Jun 25', count: 5 },
    { date: 'Jun 26', count: 2 },
  ];

  const visitedData: DataItem[] = [
    { date: 'Jun 20', count: 2 },
    { date: 'Jun 21', count: 4 },
    { date: 'Jun 22', count: 3 },
    { date: 'Jun 23', count: 1 },
    { date: 'Jun 24', count: 3 },
    { date: 'Jun 25', count: 5 },
    { date: 'Jun 26', count: 2 },
  ];

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} sm={6}>
        <Box display="flex" flexDirection="row" justifyContent="center" width="320">
          <ChartVisitedPlaces data={visitedData} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" flexDirection="row" justifyContent="center" width="320">
          <ChartSocialInteractions data={socialData} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
