import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IDashboardState } from "../states/dashboardStates";
import api, { FilterType, ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';

const dashboardActions = {
  FETCH_DATA: 'DASHBOARD_FETCH_DATA',
  ADD_SOCIAL: 'DASHBOARD_ADD_SOCIAL',
  FETCH_SOCIAL: 'DASHBOARD_FETCH_SOCIAL',
  ADD_VISITED: 'DASHBOARD_ADD_VISITED',
  FETCH_VISITED: 'DASHBOARD_FETCH_VISITED',
};

export interface IDashboardAction {
  type: string;
};

export interface IDashboardFetchDataActionPayload {
  socialInteractions: ISocialInteractionData[];
  totalCountSocialInteractions: number;
  visitedPlaces: IVisitedPlaceData[];
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

export type DashboardAppDispatch = ThunkDispatch<IDashboardState, any, IDashboardAction>;
export const useDashboardDispatch = (): DashboardAppDispatch => useDispatch();

export const dashboardFetchDataAction = 
(totalCountSocialInteractions: number, totalCountVisitedPlaces: number, 
  socialInteractions: ISocialInteractionData[], visitedPlaces: IVisitedPlaceData[]) : IDashboardFetchDataAction => ({
  type: dashboardActions.FETCH_DATA,
  payload: {
    totalCountSocialInteractions,
    totalCountVisitedPlaces,
    socialInteractions,
    visitedPlaces,
  },
});

export const performDashboardFetchData = (filter: FilterType = {}) => 
  async (dispatch: DashboardAppDispatch) => {
    const result = await Promise.all([
      api.countSocialInteractions({ to: filter.to }),
      api.countVisitedPlaces({ to: filter.to }),
      api.getSocialInteractions(filter),
      api.getVisitedPlaces(filter),
    ]);

    const [totalCountSocialInteractions, totalCountVisitedPlaces, socialInteractions, visitedPlaces] = result;

    return dispatch(dashboardFetchDataAction(
      totalCountSocialInteractions,
      totalCountVisitedPlaces,
      socialInteractions,
      visitedPlaces
    ));
  } 

export interface IDashboardAddSocialActionPayload {
  socialInteraction: ISocialInteractionData;
};

export interface IDashboardAddSocialAction extends IDashboardAction {
  payload: IDashboardAddSocialActionPayload;
};

export const dashboardAddSocialAction = 
(socialInteraction: ISocialInteractionData) : IDashboardAddSocialAction => ({
  type: dashboardActions.ADD_SOCIAL,
  payload: {
    socialInteraction,
  },
});

export const performDashboardAddSocial = (data: ISocialInteractionData) => 
  async (dispatch: DashboardAppDispatch) => {
    const id = await api.postSocialInteraction(data);
    data._id = id;

    return dispatch(dashboardAddSocialAction(data));
  } 

export interface IDashboardFetchSocialActionPayload {
  socialInteractions: ISocialInteractionData[];
  totalCountSocialInteractions: number;
};

export interface IDashboardFetchSocialAction extends IDashboardAction {
  payload: IDashboardFetchSocialActionPayload;
};

export const dashboardFetchSocialAction = 
(totalCountSocialInteractions: number, socialInteractions: ISocialInteractionData[]) : IDashboardFetchSocialAction => ({
  type: dashboardActions.FETCH_SOCIAL,
  payload: {
    socialInteractions,
    totalCountSocialInteractions,
  },
});

export const performDashboardFetchSocialData = (filter: FilterType = {}) => 
  async (dispatch: DashboardAppDispatch) => {
    const result = await Promise.all([
      api.countSocialInteractions({ to: filter.to }),
      api.getSocialInteractions(filter),
    ]);

    const [count, socialInteractions] = result;

    return dispatch(dashboardFetchSocialAction(
      count,
      socialInteractions
    ));
  } 

export interface IDashboardAddVisitedActionPayload {
  visitedPlace: IVisitedPlaceData;
};

export interface IDashboardAddVisitedAction extends IDashboardAction {
  payload: IDashboardAddVisitedActionPayload;
};

export const dashboardAddVisitedAction = 
(visitedPlace: IVisitedPlaceData) : IDashboardAddVisitedAction => ({
  type: dashboardActions.ADD_VISITED,
  payload: {
    visitedPlace,
  },
});

export const performDashboardAddVisited = (data: IVisitedPlaceData) => 
  async (dispatch: DashboardAppDispatch) => {
    const id = await api.postVisitedPlace(data);
    data._id = id;

    return dispatch(dashboardAddVisitedAction(data));
  } 

export interface IDashboardFetchVisitedActionPayload {
  visitedPlaces: IVisitedPlaceData[];
  totalCountVisitedPlaces: number;
};

export interface IDashboardFetchVisitedAction extends IDashboardAction {
  payload: IDashboardFetchVisitedActionPayload;
};

export const dashboardFetchVisitedAction = 
(totalCountVisitedPlaces: number, visitedPlaces: IVisitedPlaceData[]) : IDashboardFetchVisitedAction => ({
  type: dashboardActions.FETCH_VISITED,
  payload: {
    visitedPlaces,
    totalCountVisitedPlaces,
  },
});

export const performDashboardFetchVisitedData = (filter: FilterType = {}) => 
  async (dispatch: DashboardAppDispatch) => {
    const result = await Promise.all([
      api.countVisitedPlaces({ to: filter.to }),
      api.getVisitedPlaces(filter),
    ]);

    const [count, visitedPlaces] = result;

    return dispatch(dashboardFetchVisitedAction(
      count,
      visitedPlaces
    ));
  } 

export default dashboardActions;
