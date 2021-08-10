import React, { useEffect, useState }  from 'react';
import { useDispatch } from 'react-redux';
import { Container, Popover, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import { ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';
import { useCustomSelector } from '../../lib/hooks';
import utils from '../../lib/utils';
import { 
  DashboardAppDispatch, 
  performDashboardAddSocial, 
  performDashboardAddVisited, 
  performDashboardFetchData, 
  performDashboardFetchSocialData, 
  performDashboardFetchVisitedData,
} from '../../store/actions/dashboardActions';
import states from '../../store/states/dashboardStates';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import SocialInteractionDialog from '../social_interaction/SocialInteractionDialog';
import VisitedPlaceDialog from '../visited_place/VisitedPlaceDialog';
import ChartsSection from './ChartsSection';
import NotificationList from './NotificationList';
// import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const dispatch: DashboardAppDispatch = useDispatch();

  const [openSocialInteraction, setOpenSocialInteraction] = useState(false);
  const [openVisitedPlace, setOpenVisitedPlace] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentDate = utils.currentDate();
  const currentDateMaxTimeString = utils.toDateTimeString(utils.maxTime(currentDate));

  const last7DaysDate = utils.dateAddDays(currentDate, -7 + 1);
  const last7DaysMinTimeString = utils.toDateTimeString(utils.minTime(last7DaysDate));

  useEffect(() => {
    if(dashboardState.stateName === states.START) {
      dispatch(performDashboardFetchData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    } else if (dashboardState.stateName === states.OUTDATED_SOCIAL) {
      dispatch(performDashboardFetchSocialData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    } else if (dashboardState.stateName === states.OUTDATED_VISITED) {
      dispatch(performDashboardFetchVisitedData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    }
  }, [dispatch, dashboardState, last7DaysMinTimeString, currentDateMaxTimeString]);

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

  const handleClickedNotification = (e: any) => {
    setAnchorEl(e.currentTarget);
    setOpenNotification(true);
  };
  
  const handleNotificationClose = (e: any) => {
    setOpenNotification(false);
  };
  
  return (
    <Loader isLoading={dashboardState.stateName === states.START}>
      <Container disableGutters>
        <Header onClickedNotification={handleClickedNotification} />
        <Popover
          id="notification-popover"
          open={openNotification}
          onClose={handleNotificationClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Typography variant="body1" component="div">
            <NotificationList />
          </Typography>
        </Popover>
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

        <ChartsSection />

      </Container>
    </Loader>
  );
};

export default Dashboard;
