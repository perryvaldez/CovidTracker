import React from 'react';
import { PropTypes, Typography } from '@material-ui/core';

type InlineTextProps = {
  align?: PropTypes.Alignment,
  className?: string,
};

export const InlineText: React.FC<InlineTextProps> = ({ children, align, className }) => (
  <Typography variant="body1" component="span" align={align} className={className}>{children}</Typography>
);

export default InlineText;

