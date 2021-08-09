import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import charting from '../../lib/charting';
import { useCustomSelector } from '../../lib/hooks';
import ChartVisitedPlaces from './ChartVisitedPlaces';
import styles from './ChartsSection.styles';
import ChartSocialInteractions from './ChartSocialInteractions';

export const ChartsSection: React.FC = () => {
  const dashboardState = useCustomSelector(state => state.dashboard);

  const socialData = charting.extractData(dashboardState.payload.socialInteractions);
  const visitedData = charting.extractData(dashboardState.payload.visitedPlaces);

  const classes = makeStyles(styles)();

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
