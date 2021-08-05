import React, { useEffect, useState }  from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import { DashboardAppDispatch, performDashboardFetchData } from '../../store/actions/dashboardActions';
import { useCustomSelector } from '../../lib/hooks';
import states from '../../store/states/dashboardStates';
import SocialInteractionDialog from '../social_interaction/SocialInteractionDialog';
// import styles from './Dashboard.styles';

const handleOpenSocialInteractionDialog = (setOpenSocialInteractions: any) => (e: any) => {
  setOpenSocialInteractions(true);
};

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  const [openSocialInteractions, setOpenSocialInteractions] = useState(false);

  useEffect(() => {
    dispatch(performDashboardFetchData());
  }, [dispatch]);

  // const classes = makeStyles(styles)();

  return (
    <Loader isLoading={dashboardState.stateName === states.START}>
      <Container disableGutters>
        <Header />
        <DashboardButtons
          totalCountSocialInteractions={dashboardState.payload.totalCountSocialInteractions}
          totalCountVisitedPlaces={dashboardState.payload.totalCountVisitedPlaces}
          openSocialInteractionsDialog={handleOpenSocialInteractionDialog(setOpenSocialInteractions)}
        />
        <SocialInteractionDialog open={openSocialInteractions} onClose={() => {}} />
      </Container>
    </Loader>
  );
};

export default Dashboard;
