import React from 'react';
import classnames from 'classnames';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import styles from './NotificationListItem.styles';

type NotificationListItemProp = {
  type: 'error' | 'info',
};

export const NotificationListItem: React.FC<NotificationListItemProp> = ({ type, children }) => {
  const classes = makeStyles(styles)();
  let icon: JSX.Element;

  if(type === 'error') {
    icon = (<ErrorOutlineOutlinedIcon className={classnames(classes.icon, classes.iconError)} />);
  } else {
    icon = (<InfoOutlinedIcon className={classnames(classes.icon, classes.iconInfo)} />);
  }

  return (
    <ListItem disableGutters dense>
      <div className={classnames(classes.item, classes[type])}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </div>
    </ListItem>
  );
};

export default NotificationListItem;
