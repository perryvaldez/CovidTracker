import React from 'react';
import { PropTypes, Typography } from '@material-ui/core';

type PProps = {
  align?: PropTypes.Alignment,
  className?: string,
};

export const P: React.FC<PProps> = ({ children, align, className }) => (
  <Typography variant="body1" component="p" align={align} className={className}>{children}</Typography>
);

export default P;
