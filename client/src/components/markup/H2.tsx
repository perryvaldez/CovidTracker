import React from 'react';
import { PropTypes, Typography } from '@material-ui/core';

type H2Props = {
  align?: PropTypes.Alignment,
  className?: string,
};

export const H2: React.FC<H2Props> = ({ children, align, className }) => (
  <Typography variant="h2" component="h2" align={align} className={className}>{children}</Typography>
);

export default H2;

