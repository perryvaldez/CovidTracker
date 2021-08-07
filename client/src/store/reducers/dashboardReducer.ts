import { Reducer } from 'redux';
import a, { IDashboardAction, IDashboardAddSocialAction, IDashboardFetchDataAction, IDashboardFetchSocialAction } from '../actions/dashboardActions';
import s, { DashboardStartState as startState, IDashboardState } from '../states/dashboardStates';

const dashboardReducer: Reducer<IDashboardState, IDashboardAction> = 
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as IDashboardFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.READY:
      if (action.type === a.ADD_SOCIAL) {
          const addSocialAction = action as IDashboardAddSocialAction;

          return {
            ...state,
            stateName: s.OUTDATED_SOCIAL,
            payload: { ...state.payload, ...addSocialAction.payload },
          };
      }
      break;

    case s.OUTDATED_SOCIAL:
      if (action.type === a.FETCH_SOCIAL) {
          const fetchSocialAction = action as IDashboardFetchSocialAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchSocialAction.payload },
          };
      }
      break;
     
  }

  return state;
};

export default dashboardReducer;
