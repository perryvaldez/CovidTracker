import React, { useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import { DashboardAppDispatch, performDashboardFetchData } from '../../store/actions/dashboardActions';
import { useCustomSelector } from '../../lib/hooks';
import states from '../../store/states/dashboardStates';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  useEffect(() => {
    dispatch(performDashboardFetchData());
  }, [dispatch]);

  // const classes = makeStyles(styles)();

  return (
    <Loader isLoading={dashboardState.stateName === states.START}>
      <Container disableGutters>
        <Header />
        <DashboardButtons />
      </Container>
    </Loader>
  );
};

export default Dashboard;
