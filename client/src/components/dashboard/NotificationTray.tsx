import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/styles';
import { Box, IconButton } from '@material-ui/core';
import styles from './NotificationTray.styles';
import Counter from './Counter';

export const NotificationTray: React.FC = () => {
  const classes = makeStyles(styles)();
  return (
    <Box display="flex" alignItems="center">
      <div>
        <IconButton aria-label="View notifications" className={classes.notificationButton} disableRipple disableFocusRipple size="small">
          <NotificationsIcon className={classes.notificationIcon} />
        </IconButton>
      </div>
      <Counter count={0} />
    </Box>
  );
};

export default NotificationTray;
