import { Reducer } from 'redux';
import a, { INotificationAction, INotificationFetchDataAction } from '../actions/notificationActions';
import s, { INotificationState, NotificationStartState as startState } from '../states/notificationStates';

const notificationReducer: Reducer<INotificationState, INotificationAction> =
(state = startState, action) => {
  console.log('notificationReducer: ', { state, action });

  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as INotificationFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;
  }

  return state;
};

export default notificationReducer;
