import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import styles from './DataTablePageControls.styles';

export type DataTablePageControlsProps = {
  disabled?: boolean,
  count: number,
  onPageChange: (e: any, page: number) => void,
  page: number,
  rowsPerPage: number,
};

export const DataTablePageControls: React.FC<DataTablePageControlsProps> = 
({ disabled, count, onPageChange, page, rowsPerPage }) => {
  const classes = makeStyles(styles)();

  const handleFirstButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton 
        aria-label="First Page" 
        disabled={disabled || page === 0} 
        onClick={handleFirstButtonClick}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton 
        aria-label="Previous Page" 
        disabled={disabled || page === 0} 
        onClick={handleBackButtonClick}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton 
        aria-label="Next Page" 
        disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1} 
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton 
        aria-label="Last Page" 
        disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1} 
        onClick={handleLastButtonClick}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default DataTablePageControls;
