import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, IconButton } from '@material-ui/core';
import { NotificationTrayProps } from '../../lib/notification';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Counter from './Counter';
import styles from './NotificationTray.styles';

export const NotificationTray: React.FC<NotificationTrayProps> = ({ onClickedNotification }) => {
  const classes = makeStyles(styles)();
  return (
    <Box display="flex" alignItems="center">
      <div>
        <IconButton
          aria-label="View notifications" 
          className={classes.notificationButton} 
          disableRipple 
          disableFocusRipple 
          size="small"
          onClick={onClickedNotification}
        >
          <NotificationsIcon className={classes.notificationIcon} />
        </IconButton>
      </div>
      <Counter count={0} />
    </Box>
  );
};

export default NotificationTray;
