import React from 'react';
import { List, makeStyles, useMediaQuery } from '@material-ui/core';
import { useCustomSelector } from '../../lib/hooks';
import NotificationListItem from './NotificationListItem';
import styles from './NotificationList.styles';

export const NotificationList = () => {
  const classes = makeStyles(styles)();

  const isSmallWidthOrWider = useMediaQuery('(min-width: 600px)');

  let [width, height] = [300, 300];
  if(isSmallWidthOrWider) {
    width = 600;
    height = 180;
  }

  const notificationState = useCustomSelector(state => state.notification);

  let crowdedNotifItem = (
    <NotificationListItem type="info">
      Thank you for helping to stop spread the virus by staying home.
    </NotificationListItem>
  );

  if(notificationState.payload.countCrowded > 0) {
    crowdedNotifItem = (
      <NotificationListItem type="error">
        You have been exposed to a crowded place for the last 14 days.
        Try to avoid crowded places to minimize your exposure risk.
      </NotificationListItem>
    );
  }

  let notDistancedNotifItem = (
    <NotificationListItem type="info">
      You are maintaining proper social distancing. Keep it up!
    </NotificationListItem>
  );

  if(notificationState.payload.countNoSocialDistance > 0) {
    notDistancedNotifItem = (
      <NotificationListItem type="error">
        You did not practice social distancing for the last 14 days.
        Stay at home and maintain 1-2 meters away from other people.
      </NotificationListItem>
    );
  }

  return (
    <div className={classes.container} style={{ width, height }}>
      <List>
        {crowdedNotifItem}
        {notDistancedNotifItem}
      </List>
    </div>
  );
};

export default NotificationList;
