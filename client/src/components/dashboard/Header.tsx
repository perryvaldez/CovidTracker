import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { HeaderProps } from '../../lib/dashboard';
import H1 from '../markup/H1';
import NotificationTray from './NotificationTray';
import styles from './Header.styles';

export const Header: React.FC<HeaderProps> = ({ onClickedNotification }) => {
  const classes = makeStyles(styles)();
  return (
    <Grid container spacing={2} className={classes.header}>
      <Grid item xs={10}>
        <Box display="flex" alignItems="center" height="100%">
          <H1 className={classes.title}>COVID Exposure Tracker Tool</H1>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" justifyContent="flex-end">
          <NotificationTray onClickedNotification={onClickedNotification} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
