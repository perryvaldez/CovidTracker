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
import VisitedPlaceDialog from '../visited_place/VisitedPlaceDialog';
// import styles from './Dashboard.styles';

const handleOpenSocialInteractionDialog = (setOpenSocialInteraction: React.Dispatch<boolean>) => (e: any) => {
  setOpenSocialInteraction(true);
};

const handleCloseSocialInteractionDialog = (setOpenSocialInteraction: React.Dispatch<boolean>) => (e: any) => {
  setOpenSocialInteraction(false);
};

const handleOpenVisitedPlaceDialog = (setOpenVisitedPlace: React.Dispatch<boolean>) => (e: any) => {
  setOpenVisitedPlace(true);
};

const handleCloseVisitedPlaceDialog = (setOpenVisitedPlace: React.Dispatch<boolean>) => (e: any) => {
  setOpenVisitedPlace(false);
};

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  const [openSocialInteraction, setOpenSocialInteraction] = useState(false);
  const [openVisitedPlace, setOpenVisitedPlace] = useState(false);

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
          openSocialInteractionDialog={handleOpenSocialInteractionDialog(setOpenSocialInteraction)}
          openVisitedPlaceDialog={handleOpenVisitedPlaceDialog(setOpenVisitedPlace)}
        />
        <SocialInteractionDialog open={openSocialInteraction} onClose={handleCloseSocialInteractionDialog(setOpenSocialInteraction)} />
        <VisitedPlaceDialog open={openVisitedPlace} onClose={handleCloseVisitedPlaceDialog(setOpenVisitedPlace)} />
      </Container>
    </Loader>
  );
};

export default Dashboard;
