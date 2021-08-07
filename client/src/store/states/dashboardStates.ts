import { ISocialInteractionData, IVisitedPlaceData } from "../../lib/api";

const dashboardStates = {
  START: 'DASHBOARD_START',
  READY: 'DASHBOARD_READY',
  OUTDATED_SOCIAL: 'DASHBOARD_OUTDATED_SOCIAL',
};

export interface IDashboardPayload {
  socialInteraction?: ISocialInteractionData;
  socialInteractions: ISocialInteractionData[];
  totalCountSocialInteractions: number;
  visitedPlace?: IVisitedPlaceData;
  visitedPlaces: IVisitedPlaceData[];
  totalCountVisitedPlaces: number;
};

export interface IDashboardState {
  stateName: string;
  payload: IDashboardPayload;
};

export const NullDashboardPayload = {
  socialInteractions: [],
  totalCountSocialInteractions: 0,
  visitedPlaces: [],
  totalCountVisitedPlaces: 0,
};

export const DashboardStartState: IDashboardState = {
  stateName: dashboardStates.START,
  payload: NullDashboardPayload,
};

export default dashboardStates;
