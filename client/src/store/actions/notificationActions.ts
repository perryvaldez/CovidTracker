import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType } from '../../lib/api';
import { INotificationState } from '../states/notificationStates';


const notificationActions = {
  FETCH_DATA: 'NOTIFICATION_FETCH_DATA',
  UPDATE_DATA: 'NOTIFICATION_UPDATE_DATA',
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

export interface INotificationUpdateDataActionPayload {};

export interface INotificationUpdateDataAction extends INotificationAction {
  payload: INotificationUpdateDataActionPayload;
};

export const notificationUpdateDataAction = () => ({
  type: notificationActions.UPDATE_DATA,
  payload: {},
});

export const performNotificationUpdateData = () => 
  async (dispatch: NotificationAppDispatch) => {
    return(dispatch(notificationUpdateDataAction()));
  };


export default notificationActions;
