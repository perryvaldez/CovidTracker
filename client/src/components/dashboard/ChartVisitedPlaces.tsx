import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import H2 from '../markup/H2';
import styles from './ChartVisitedPlaces.styles';
import { ChartProps } from '../../lib/charting';

type DataItem = {
  date: string,
  count: number,
};

export const ChartVisitedPlaces: React.FC<ChartProps> = ({ data }) => {
  const classes = makeStyles(styles)();

  return (
   <div>
    <Typography variant="body1" component="div">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <H2 className={classes.title}>Recent Visited Places</H2>
        <div className={classes.link}><Link to="/visited">View All</Link></div>
      </Box>
      <BarChart width={300} height={200} data={data} margin={{ left: 0, right: 0 }}>
        <CartesianGrid strokeDasharray="4 2" />
        <XAxis dataKey="date" padding={{ left: 8, right: 8 }} />
        <YAxis dataKey="count" allowDecimals={false}>
          <Label value="No. of Visited Places" angle={-90} dx={-20} />
        </YAxis>
        <Bar dataKey="count" fill="#2b51db" />
      </BarChart>     
    </Typography>
   </div>
  );
};

export default ChartVisitedPlaces;
