import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { ListItemIcon } from '@material-ui/core';
import styles from './NotificationList.styles';

export const NotificationList = () => {
  const classes = makeStyles(styles)();

  return (
    <div className={classes.container}>
      <List>
        <ListItem>
          <ListItemIcon>
            <ErrorIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            You did not practice social distancing for the last 14 days.
            Stay at home and maintain 1-2 meters away from other people.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            You have been exposed to a crowded place for the last 14 days.
            Try to avoid crowded places to minimize your exposure risk.
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default NotificationList;
