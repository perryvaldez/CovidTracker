import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import H2 from '../markup/H2';
import styles from './ChartSocialInteractions.styles';
import { ChartProps } from '../../lib/charting';

export const ChartSocialInteractions: React.FC<ChartProps> = ({ data, width, height }) => {
  const classes = makeStyles(styles)();

  return (
   <div>
    <Typography variant="body1" component="div">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <H2 className={classes.title}>Recent Social Interactions</H2>
        <div className={classes.link}><Link to="/social">View All</Link></div>
      </Box>
      <BarChart width={width} height={height} data={data} margin={{ left: 0, right: 0 }}>
        <CartesianGrid strokeDasharray="4 2" />
        <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
        <YAxis dataKey="count" allowDecimals={false}>
          <Label value="No. of Interactions" angle={-90} dx={-20} />
        </YAxis>
        <Bar dataKey="count" fill="#2b51db" />
      </BarChart>     
    </Typography>
   </div>
  );
};

export default ChartSocialInteractions;

