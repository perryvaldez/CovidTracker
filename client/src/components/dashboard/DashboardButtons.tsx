import React from 'react';
import { Box, Button, Grid, makeStyles, Tooltip } from '@material-ui/core';
import socialIcon from '../../assets/images/social_90.png';
import locationWarnIcon from '../../assets/images/location_warn_90.png';
import resetIcon from '../../assets/images/reset_90.png';
import styles from './DashboardButtons.styles';

export const DashboardButtons: React.FC = () => {
    const classes = makeStyles(styles)();
    return (
      <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <Tooltip title="Add Social Interaction">
                  <Button variant="contained" aria-label="Add Social Interaction" className={classes.button}>
                      <img src={socialIcon} width="48" height="48" alt="Add Social Interaction" />
                  </Button>
                </Tooltip>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                  <Tooltip title="Add Place Exposure">
                    <Button variant="contained" aria-label="Add Place Exposure" className={classes.button}>
                        <img src={locationWarnIcon} width="48" height="48"  alt="Add Place Exposure" />
                    </Button>
                  </Tooltip>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                  <Tooltip title="Reset Data">
                    <Button variant="contained" aria-label="Reset Data" className={classes.button}>
                        <img src={resetIcon} width="48" height="48"  alt="Reset Data" />
                    </Button>
                  </Tooltip>
              </Box>
          </Grid>
      </Grid>
    );
};

export default DashboardButtons;
