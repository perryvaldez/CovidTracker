import React from 'react';
import { Box, Grid } from '@material-ui/core';
import H1 from '../markup/H1';

type PageHeaderProps = {
  text: string,
  className?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ text, className }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" height="100%">
          <H1 className={className}>{text}</H1>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
