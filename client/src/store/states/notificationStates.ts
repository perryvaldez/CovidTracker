const notificationStates = {
  START: 'NOTIFICATION_START',
  READY: 'NOTIFICATION_READY',
  OUTDATED_DATA: 'NOTIFICATION_OUTDATED_DATA',
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
