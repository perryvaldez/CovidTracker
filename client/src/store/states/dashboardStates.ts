import { IDashboardFetchDataActionPayload, NullDashboardFetchDataActionPayload } from "../actions/dashboardActions";

const dashboardStates = {
  START: 'DASHBOARD_START',
  READY: 'DASHBOARD_READY',
};

export interface IDashboardState {
  stateName: string;
  payload: IDashboardFetchDataActionPayload;
};

export const DashboardStartState: IDashboardState = {
  stateName: dashboardStates.START,
  payload: NullDashboardFetchDataActionPayload,
};

export default dashboardStates;
