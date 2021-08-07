import { ISocialInteractionData, IVisitedPlaceData } from "../../lib/api";

const dashboardStates = {
  START: 'DASHBOARD_START',
  READY: 'DASHBOARD_READY',
  OUTDATED_SOCIAL: 'DASHBOARD_OUTDATED_SOCIAL',
  OUTDATED_VISITED: 'DASHBOARD_OUTDATED_VISITED',
};

export interface IDashboardPayload {
  socialInteraction?: ISocialInteractionData;
  socialInteractions: ISocialInteractionData[];
  dashboardSocialInteractions: ISocialInteractionData[];  // Up to 14 days of latest data only
  totalCountSocialInteractions: number;
  visitedPlace?: IVisitedPlaceData;
  visitedPlaces: IVisitedPlaceData[];
  dashboardVisitedPlaces: IVisitedPlaceData[];  // Up to 14 days of latest data only
  totalCountVisitedPlaces: number;
};

export interface IDashboardState {
  stateName: string;
  payload: IDashboardPayload;
};

export const NullDashboardPayload = {
  socialInteractions: [],
  dashboardSocialInteractions: [],
  totalCountSocialInteractions: 0,
  visitedPlaces: [],
  dashboardVisitedPlaces: [],
  totalCountVisitedPlaces: 0,
};

export const DashboardStartState: IDashboardState = {
  stateName: dashboardStates.START,
  payload: NullDashboardPayload,
};

export default dashboardStates;
