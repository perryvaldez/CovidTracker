import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import H2 from '../markup/H2';
import styles from './ChartVisitedPlaces.styles';
import { Link } from 'react-router-dom';

type DataItem = {
  date: string,
  count: number,
};

export const ChartVisitedPlaces = () => {
  const data: DataItem[] = [
    { date: 'Jun 20', count: 2 },
    { date: 'Jun 21', count: 4 },
    { date: 'Jun 22', count: 3 },
    { date: 'Jun 23', count: 1 },
    { date: 'Jun 24', count: 3 },
    { date: 'Jun 25', count: 5 },
    { date: 'Jun 26', count: 2 },
  ];

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
        <YAxis dataKey="count" label={{ value: 'No. of Visited Places', angle: -90 }} />
        <Bar dataKey="count" fill="#2b51db" />
      </BarChart>     
    </Typography>
   </div>
  );
};

export default ChartVisitedPlaces;
