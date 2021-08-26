import { Reducer } from 'redux';
import a, { 
  IDashboardAction, 
  IDashboardAddSocialAction, 
  IDashboardAddVisitedAction, 
  IDashboardFetchDataAction, 
  IDashboardFetchSocialAction, 
  IDashboardFetchVisitedAction, 
  IDashboardRefreshSocialAction, 
  IDashboardRefreshVisitedAction,
} from '../actions/dashboardActions';
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

      if (action.type === a.ADD_VISITED) {
          const addVisitedAction = action as IDashboardAddVisitedAction;

          return {
            ...state,
            stateName: s.OUTDATED_VISITED,
            payload: { ...state.payload, ...addVisitedAction.payload },
          };
      }

      if (action.type === a.REFRESH_SOCIAL) {
          const refreshSocialAction = action as IDashboardRefreshSocialAction;

          return {
            ...state,
            stateName: s.OUTDATED_SOCIAL,
            payload: { ...state.payload, ...refreshSocialAction.payload },
          };
      }

      if (action.type === a.REFRESH_VISITED) {
          const refreshVisitedAction = action as IDashboardRefreshVisitedAction;

          return {
            ...state,
            stateName: s.OUTDATED_VISITED,
            payload: { ...state.payload, ...refreshVisitedAction.payload },
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

    case s.OUTDATED_VISITED:
      if (action.type === a.FETCH_VISITED) {
          const fetchVisitedAction = action as IDashboardFetchVisitedAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchVisitedAction.payload },
          };
      }
      break;
     
  }

  return state;
};

export default dashboardReducer;
