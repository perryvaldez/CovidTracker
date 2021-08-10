import React from 'react';
import { List, makeStyles, useMediaQuery } from '@material-ui/core';
import styles from './NotificationList.styles';
import NotificationListItem from './NotificationListItem';

export const NotificationList = () => {
  const classes = makeStyles(styles)();

  const isSmallWidthOrWider = useMediaQuery('(min-width: 600px)');

  let [width, height] = [300, 300];
  if(isSmallWidthOrWider) {
    width = 600;
    height = 180;
  }

  return (
    <div className={classes.container} style={{ width, height }}>
      <List>
        <NotificationListItem type="error">
            You did not practice social distancing for the last 14 days.
            Stay at home and maintain 1-2 meters away from other people.
        </NotificationListItem>
        <NotificationListItem type="info">
            You have been exposed to a crowded place for the last 14 days.
            Try to avoid crowded places to minimize your exposure risk.
        </NotificationListItem>
      </List>
    </div>
  );
};

export default NotificationList;
