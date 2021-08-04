import React from 'react';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  // const classes = makeStyles(styles)();
  return (
    <Container disableGutters>
      <Header />
      <DashboardButtons />
    </Container>
  );
};

export default Dashboard;
