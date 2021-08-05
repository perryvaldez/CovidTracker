import { Reducer } from 'redux';
import a, { IDashboardAction } from '../actions/dashboardActions';
import s, { DashboardStartState as startState, IDashboardState } from '../states/dashboardStates';

const dashboardReducer: Reducer<IDashboardState, IDashboardAction> = 
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          return {
            ...startState,
            stateName: s.READY,
          };
      }
      break;
  }

  return state;
};

export default dashboardReducer;
