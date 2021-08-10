const notificationStates = {
  START: 'NOTIFICATION_START',
  READY: 'NOTIFICATION_READY',
};

export interface INotificationPayload {
  countNoSocialDistance: number,
  countCrowded: number,
};

export interface INotificationState {
  stateName: string;
  payload: INotificationPayload;
};

export const NotificationStartState: INotificationState = {
  stateName: notificationStates.START,
  payload: {
    countNoSocialDistance: 0,
    countCrowded: 0,
  },
};

export default notificationStates;
