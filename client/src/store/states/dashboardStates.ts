import { IDashboardAddSocialActionPayload, IDashboardFetchDataActionPayload, NullDashboardFetchDataActionPayload } from "../actions/dashboardActions";

const dashboardStates = {
  START: 'DASHBOARD_START',
  READY: 'DASHBOARD_READY',
  OUTDATED_SOCIAL: 'DASHBOARD_OUTDATED_SOCIAL',
};

export interface IDashboardState {
  stateName: string;
  payload: IDashboardFetchDataActionPayload | IDashboardAddSocialActionPayload;
};

export const DashboardStartState: IDashboardState = {
  stateName: dashboardStates.START,
  payload: NullDashboardFetchDataActionPayload,
};

export default dashboardStates;
