import React, { useEffect, useState }  from 'react';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/styles';
import { ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';
import { useCustomSelector } from '../../lib/hooks';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import { 
  DashboardAppDispatch, 
  performDashboardAddSocial, 
  performDashboardAddVisited, 
  performDashboardFetchData, 
  performDashboardFetchSocialData, 
  performDashboardFetchVisitedData,
} from '../../store/actions/dashboardActions';
import states from '../../store/states/dashboardStates';
import SocialInteractionDialog from '../social_interaction/SocialInteractionDialog';
import VisitedPlaceDialog from '../visited_place/VisitedPlaceDialog';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  const [openSocialInteraction, setOpenSocialInteraction] = useState(false);
  const [openVisitedPlace, setOpenVisitedPlace] = useState(false);

  useEffect(() => {
    if(dashboardState.stateName === states.START) {
      dispatch(performDashboardFetchData());
    } else if (dashboardState.stateName === states.OUTDATED_SOCIAL) {
      dispatch(performDashboardFetchSocialData());
    } else if (dashboardState.stateName === states.OUTDATED_VISITED) {
      dispatch(performDashboardFetchVisitedData());
    }
  }, [dispatch, dashboardState]);

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
    dispatch(performDashboardAddVisited(data));
    setOpenVisitedPlace(false);
  };


  return (
    <Loader isLoading={dashboardState.stateName === states.START}>
      <Container disableGutters>
        <Header />
        <DashboardButtons
          totalCountSocialInteractions={dashboardState.payload.totalCountSocialInteractions}
          totalCountVisitedPlaces={dashboardState.payload.totalCountVisitedPlaces}
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
