import React from 'react';
import { PropTypes, Typography } from '@material-ui/core';

type H1Props = {
  align?: PropTypes.Alignment,
  className?: string,
};

export const H1: React.FC<H1Props> = ({ children, align, className }) => (
  <Typography variant="h1" component="h1" align={align} className={className}>{children}</Typography>
);

export default H1;
