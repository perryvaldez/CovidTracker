import React from 'react';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  // const classes = makeStyles(styles)();
  return (
    <Loader isLoading={false}>
      <Container disableGutters>
        <Header />
        <DashboardButtons />
      </Container>
    </Loader>
  );
};

export default Dashboard;
