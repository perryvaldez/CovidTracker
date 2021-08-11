import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useCustomSelector } from '../../lib/hooks';
import { NotificationTrayProps } from '../../lib/notification';
import Counter from './Counter';
import styles from './NotificationTray.styles';

export const NotificationTray: React.FC<NotificationTrayProps> = ({ onClickedNotification }) => {
  const classes = makeStyles(styles)();

  const notificationState = useCustomSelector(state => state.notification);
  let notificationCount = 0;

  if(notificationState.payload.countCrowded > 0) {
    ++notificationCount;
  }

  if(notificationState.payload.countNoSocialDistance > 0) {
    ++notificationCount;
  }

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
      <Counter count={notificationCount} />
    </Box>
  );
};

export default NotificationTray;
