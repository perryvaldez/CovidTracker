import React from 'react';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import styles from './DataTableActionButton.styles';

type DataTableActionButtonProps = {
  title: string,
  icon: (params: any) => React.ReactNode,
  onClick?: (event: any) => void,
  disabled?: boolean,
};

export const DataTableActionButton: React.FC<DataTableActionButtonProps> = ({ title, icon, onClick, disabled }) => {
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
        disabled={disabled}
      >
        {icon({ fontSize: 'small'})}
      </IconButton>
    </Tooltip>
  );
};

export default DataTableActionButton;
