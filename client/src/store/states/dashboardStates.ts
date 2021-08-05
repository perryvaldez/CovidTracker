const dashboardStates = {
  START: 'DASHBOARD_START',
  READY: 'DASHBOARD_READY',
};

export interface IDashboardState {
  stateName: string;
};

export const DashboardStartState: IDashboardState = {
  stateName: dashboardStates.START,
};

export default dashboardStates;
