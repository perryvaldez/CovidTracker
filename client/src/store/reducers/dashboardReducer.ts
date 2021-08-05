import { Reducer } from 'redux';
import a, { IDashboardAction, IDashboardFetchDataAction } from '../actions/dashboardActions';
import s, { DashboardStartState as startState, IDashboardState } from '../states/dashboardStates';

const dashboardReducer: Reducer<IDashboardState, IDashboardAction> = 
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as IDashboardFetchDataAction;

          return {
            ...startState,
            stateName: s.READY,
            payload: { ...fetchAction.payload },
          };
      }
      break;
  }

  return state;
};

export default dashboardReducer;
