import { ThunkDispatch } from "redux-thunk";
import { IDashboardState } from "../states/dashboardStates";
import api, { ISocialInteractionData, IVisitedPlacesData } from '../../lib/api';

const dashboardActions = {
  FETCH_DATA: 'DASHBOARD_FETCH_DATA',
};

export interface IDashboardAction {
  type: string;
};

export interface IDashboardFetchDataActionPayload {
  socialInteractions: ISocialInteractionData[];
  totalCountSocialInteractions: number;
  visitedPlaces: IVisitedPlacesData[];
  totalCountVisitedPlaces: number;
};

export const NullDashboardFetchDataActionPayload: IDashboardFetchDataActionPayload = {
  socialInteractions: [],
  totalCountSocialInteractions: 0,
  visitedPlaces: [],
  totalCountVisitedPlaces: 0,
};

export interface IDashboardFetchDataAction extends IDashboardAction {
  payload: IDashboardFetchDataActionPayload;
};

export const dashboardFetchDataAction = 
(socialInteractions: ISocialInteractionData[], totalCountSocialInteractions: number, 
    visitedPlaces: IVisitedPlacesData[], totalCountVisitedPlaces: number) : IDashboardFetchDataAction => ({
  type: dashboardActions.FETCH_DATA,
  payload: {
    socialInteractions,
    totalCountSocialInteractions,
    visitedPlaces,
    totalCountVisitedPlaces,
  },
});

export type DashboardAppDispatch = ThunkDispatch<IDashboardState, any, IDashboardAction>;
export const performDashboardFetchData = () => 
  async (dispatch: DashboardAppDispatch) => {
    const result = await Promise.all([
      api.getSocialInteractions(),
      api.getVisitedPlaces(),
    ]);

    const totalCountSocialInteractions = result[0].length; // TODO
    const totalCountVisitedPlaces = result[1].length; // TODO

    return dispatch(dashboardFetchDataAction(
      result[0], 
      totalCountSocialInteractions,
      result[1],
      totalCountVisitedPlaces
    ));
  } 

export default dashboardActions;
