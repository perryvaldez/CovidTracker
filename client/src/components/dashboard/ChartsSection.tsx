import React from 'react';
import { Box, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import charting from '../../lib/charting';
import { useCustomSelector } from '../../lib/hooks';
import ChartVisitedPlaces from './ChartVisitedPlaces';
import styles from './ChartsSection.styles';
import ChartSocialInteractions from './ChartSocialInteractions';

export const ChartsSection: React.FC = () => {
  const dashboardState = useCustomSelector(state => state.dashboard);

  const socialData = charting.extractData(dashboardState.payload.socialInteractions, 7);
  const visitedData = charting.extractData(dashboardState.payload.visitedPlaces, 7);

  const classes = makeStyles(styles)();
  const isMediumWidthOrWider = useMediaQuery('(min-width: 960px)');

  let [width, height] = [290, 180];

  if(isMediumWidthOrWider) {
    width = 440;
    height = 274;
  }
  
  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} sm={6}>
        <Box display="flex" flexDirection="row" justifyContent="center" width={width + 10}>
          <ChartVisitedPlaces data={visitedData} width={width} height={height} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" flexDirection="row" justifyContent="center" width={width + 10}>
          <ChartSocialInteractions data={socialData} width={width} height={height} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
