import React from 'react';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import styles from './DataTableActionButton.styles';

type DataTableActionButtonProps = {
  title: string,
  icon: (params: any) => React.ReactNode,
  onClick?: (event: any) => void,
};

export const DataTableActionButton: React.FC<DataTableActionButtonProps> = ({ title, icon, onClick }) => {
  const classes = makeStyles(styles)();

  return (
    <Tooltip title={title}>
      <IconButton 
        className={classes.actionIcon} 
        size="small" 
        disableRipple 
        aria-label={title} 
        color="primary" 
        onClick={onClick}
      >
        {icon({ fontSize: 'small'})}
      </IconButton>
    </Tooltip>
  );
};

export default DataTableActionButton;
