import React, { useEffect, useState }  from 'react';
import { Container, makeStyles, Popover, Typography } from '@material-ui/core';
import { ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';
import { useCustomSelector } from '../../lib/hooks';
import utils from '../../lib/utils';
import { 
  performDashboardAddSocial, 
  performDashboardAddVisited, 
  performDashboardFetchData, 
  performDashboardFetchSocialData, 
  performDashboardFetchVisitedData,
  useDashboardDispatch,
} from '../../store/actions/dashboardActions';
import { performNotificationFetchData, useNotificationDispatch } from '../../store/actions/notificationActions';
import dashboardStates from '../../store/states/dashboardStates';
import notificationStates from '../../store/states/notificationStates';
import DashboardButtons from './DashboardButtons';
import Header from './Header';
import Loader from '../shared/Loader';
import SocialInteractionDialog from '../social_interaction/SocialInteractionDialog';
import VisitedPlaceDialog from '../visited_place/VisitedPlaceDialog';
import ChartsSection from './ChartsSection';
import NotificationList from './NotificationList';
import styles from './Dashboard.styles';

export const Dashboard: React.FC = () => { 
  const dashboardState = useCustomSelector(state => state.dashboard);
  const notificationState = useCustomSelector(state => state.notification);

  const dashboardDispatch = useDashboardDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [openSocialInteraction, setOpenSocialInteraction] = useState(false);
  const [openVisitedPlace, setOpenVisitedPlace] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentDate = utils.currentDate();
  const currentDateMaxTimeString = utils.toDateTimeString(utils.maxTime(currentDate));

  const last7DaysDate = utils.dateAddDays(currentDate, -7 + 1);
  const last7DaysMinTimeString = utils.toDateTimeString(utils.minTime(last7DaysDate));

  const last14DaysDate = utils.dateAddDays(currentDate, -14 + 1);
  const last14DaysMinTimeString = utils.toDateTimeString(utils.minTime(last14DaysDate));

  useEffect(() => {
    if(dashboardState.stateName === dashboardStates.START) {
      dashboardDispatch(performDashboardFetchData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    } else if (dashboardState.stateName === dashboardStates.OUTDATED_SOCIAL) {
      dashboardDispatch(performDashboardFetchSocialData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    } else if (dashboardState.stateName === dashboardStates.OUTDATED_VISITED) {
      dashboardDispatch(performDashboardFetchVisitedData({ to: currentDateMaxTimeString, from: last7DaysMinTimeString }));
    }

    if(notificationState.stateName === notificationStates.START) {
      notificationDispatch(performNotificationFetchData({
        to: currentDateMaxTimeString, from: last14DaysMinTimeString, 
      }));
    }

  }, [
    dashboardDispatch, notificationDispatch, dashboardState, last7DaysMinTimeString, 
    last14DaysMinTimeString, currentDateMaxTimeString, notificationState,
  ]);

  const classes = makeStyles(styles)();

  const handleOpenSocialInteractionDialog = (e: any) => {
    setOpenSocialInteraction(true);
  };

  const handleCloseSocialInteractionDialog = (e: any) => {
    setOpenSocialInteraction(false);
  };

  const handleSaveSocialInteractionDialog = (data: ISocialInteractionData) => (e: any) => {
    dashboardDispatch(performDashboardAddSocial(data));
    setOpenSocialInteraction(false);
  };

  const handleOpenVisitedPlaceDialog = (e: any) => {
    setOpenVisitedPlace(true);
  };

  const handleCloseVisitedPlaceDialog = (e: any) => {
    setOpenVisitedPlace(false);
  };

  const handleSaveVisitedPlaceDialog = (data: IVisitedPlaceData) => (e: any) => {
    dashboardDispatch(performDashboardAddVisited(data));
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
    <Loader isLoading={dashboardState.stateName === dashboardStates.START}>
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
