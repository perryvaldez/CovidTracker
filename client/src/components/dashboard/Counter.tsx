import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import InlineText from '../markup/InlineText';
import styles from './Counter.styles';

type CounterProps = {
    count: number,
};

export const Counter: React.FC<CounterProps> = ({ count }) => {
  const classes = makeStyles(styles)();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.container}>
      <InlineText className={classes.text}>{count}</InlineText>
    </Box>
  );
};

export default Counter;
