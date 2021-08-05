import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import IconButtonWithCounter from './IconButtonWithCounter';
import socialIcon from '../../assets/images/social_36.png';
import locationWarnIcon from '../../assets/images/location_warn_36.png';
import resetIcon from '../../assets/images/reset_36.png';
import styles from './DashboardButtons.styles';

type DashboardButtonsProps = {
  totalCountSocialInteractions: number,
  totalCountVisitedPlaces: number,
  openSocialInteractionsDialog: (e: any) => void,
};

export const DashboardButtons: React.FC<DashboardButtonsProps> = 
  ({ totalCountSocialInteractions, totalCountVisitedPlaces, openSocialInteractionsDialog }) => {
    const classes = makeStyles(styles)();
    return (
      <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <IconButtonWithCounter 
                  icon={socialIcon} 
                  title="Add Social Interaction"
                  count={totalCountSocialInteractions}
                  onClick={openSocialInteractionsDialog}
                />
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <IconButtonWithCounter 
                  icon={locationWarnIcon} 
                  title="Add Place Exposure"
                  count={totalCountVisitedPlaces}
                />
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <IconButtonWithCounter 
                  icon={resetIcon} 
                  title="Reset Data"
                  count={0}
                  hideCounter
                />
              </Box>
          </Grid>
      </Grid>
    );
};

export default DashboardButtons;
