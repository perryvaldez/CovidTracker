import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType } from '../../lib/api';
import { INotificationState } from '../states/notificationStates';


const notificationActions = {
  FETCH_DATA: 'NOTIFICATION_FETCH_DATA',
  REFRESH_DATA: 'NOTIFICATION_REFRESH_DATA',
};

export interface INotificationAction {
  type: string;
};

export type NotificationAppDispatch = ThunkDispatch<INotificationState, any, INotificationAction>;
export const useNotificationDispatch = (): NotificationAppDispatch => useDispatch();

export interface INotificationFetchDataActionPayload {
  countNoSocialDistance: 0,
  countCrowded: 0,
};

export interface INotificationFetchDataAction extends INotificationAction {
  payload: INotificationFetchDataActionPayload;
};

export const notificationFetchDataAction = 
(countNoSocialDistance: number, countCrowded: number) => ({
  type: notificationActions.FETCH_DATA,
  payload: {
    countNoSocialDistance,
    countCrowded,
  },
});

export const performNotificationFetchData = (filter: FilterType = {}) => 
  async (dispatch: NotificationAppDispatch) => {
    const result = await Promise.all([
      api.countSocialInteractions({ to: filter.to, from: filter.from, distanced: '0' }),
      api.countVisitedPlaces({ to: filter.to, from: filter.from, crowded: '1' }),
    ]);

    const [countNoSocialDistance, countCrowded] = result;

    return(dispatch(notificationFetchDataAction(countNoSocialDistance, countCrowded)));
  };

////

export interface INotificationRefreshDataActionPayload {};

export interface INotificationRefreshDataAction extends INotificationAction {
  payload: INotificationRefreshDataActionPayload;
};

export const notificationRefreshDataAction = () => ({
  type: notificationActions.REFRESH_DATA,
  payload: {},
});

export const performNotificationRefreshData = () => 
  async (dispatch: NotificationAppDispatch) => {
    return(dispatch(notificationRefreshDataAction()));
  };


export default notificationActions;
