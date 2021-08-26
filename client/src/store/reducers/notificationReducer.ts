import { Reducer } from 'redux';
import a, { INotificationAction, INotificationFetchDataAction, INotificationRefreshDataAction } from '../actions/notificationActions';
import s, { INotificationState, NotificationStartState as startState } from '../states/notificationStates';

const notificationReducer: Reducer<INotificationState, INotificationAction> =
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
    case s.OUTDATED_DATA:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as INotificationFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.READY:
      if (action.type === a.REFRESH_DATA) {
          const fetchAction = action as INotificationRefreshDataAction;

          return {
            ...state,
            stateName: s.OUTDATED_DATA,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;
  }

  return state;
};

export default notificationReducer;
