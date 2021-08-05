import { ThunkDispatch } from "redux-thunk";
import { IDashboardState } from "../states/dashboardStates";

const dashboardActions = {
  FETCH_DATA: 'DASHBOARD_FETCH_DATA',
};

export interface IDashboardAction {
  type: string;
};

export interface IDashboardFetchDataAction extends IDashboardAction {
  payload: object;
};

export const dashboardFetchDataAction = () : IDashboardFetchDataAction => ({
  type: dashboardActions.FETCH_DATA,
  payload: {},
});

export type DashboardAppDispatch = ThunkDispatch<IDashboardState, any, IDashboardAction>;
export const performDashboardFetchData = () => 
  async (dispatch: DashboardAppDispatch) => 
    dispatch(dashboardFetchDataAction());

export default dashboardActions;
