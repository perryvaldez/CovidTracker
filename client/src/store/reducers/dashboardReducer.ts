import { Reducer } from 'redux';
import states from '../states/dashboardStates';

export interface IDashboardState {
  stateName: string;
};

export interface IDashboardAction {
  type: string;
  payload: object;
};

export const DashboardStartState: IDashboardState = {
  stateName: states.START,
};

const dashboardReducer: Reducer<IDashboardState, IDashboardAction> = 
(state = DashboardStartState, action) => {
  return state;
};

export default dashboardReducer;
