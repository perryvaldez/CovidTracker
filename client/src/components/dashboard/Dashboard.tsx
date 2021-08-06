import React, { useEffect, useState }  from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import { DashboardAppDispatch, IDashboardFetchDataActionPayload, performDashboardAddSocial, performDashboardFetchData } from '../../store/actions/dashboardActions';
import { useCustomSelector } from '../../lib/hooks';
import states from '../../store/states/dashboardStates';
import SocialInteractionDialog from '../social_interaction/SocialInteractionDialog';
import VisitedPlaceDialog from '../visited_place/VisitedPlaceDialog';
import { ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  const [openSocialInteraction, setOpenSocialInteraction] = useState(false);
  const [openVisitedPlace, setOpenVisitedPlace] = useState(false);

  useEffect(() => {
    dispatch(performDashboardFetchData());
  }, [dispatch]);

  // const classes = makeStyles(styles)();

  const handleOpenSocialInteractionDialog = (e: any) => {
    setOpenSocialInteraction(true);
  };

  const handleCloseSocialInteractionDialog = (e: any) => {
    setOpenSocialInteraction(false);
  };

  const handleSaveSocialInteractionDialog = (data: ISocialInteractionData) => (e: any) => {
    dispatch(performDashboardAddSocial(data));
    setOpenSocialInteraction(false);
  };

  const handleOpenVisitedPlaceDialog = (e: any) => {
    setOpenVisitedPlace(true);
  };

  const handleCloseVisitedPlaceDialog = (e: any) => {
    setOpenVisitedPlace(false);
  };

  const handleSaveVisitedPlaceDialog = (data: IVisitedPlaceData) => (e: any) => {
    console.log('Visited place: ', { data });
    setOpenVisitedPlace(false);
  };


  return (
    <Loader isLoading={dashboardState.stateName === states.START}>
      <Container disableGutters>
        <Header />
        <DashboardButtons
          totalCountSocialInteractions={(dashboardState.payload as IDashboardFetchDataActionPayload).totalCountSocialInteractions}
          totalCountVisitedPlaces={(dashboardState.payload as IDashboardFetchDataActionPayload).totalCountVisitedPlaces}
          openSocialInteractionDialog={handleOpenSocialInteractionDialog}
          openVisitedPlaceDialog={handleOpenVisitedPlaceDialog}
        />
        <SocialInteractionDialog 
          open={openSocialInteraction} 
          onClose={handleCloseSocialInteractionDialog}
          onSave={handleSaveSocialInteractionDialog}
        />
        <VisitedPlaceDialog
          open={openVisitedPlace} 
          onClose={handleCloseVisitedPlaceDialog} 
          onSave={handleSaveVisitedPlaceDialog}
        />
      </Container>
    </Loader>
  );
};

export default Dashboard;
