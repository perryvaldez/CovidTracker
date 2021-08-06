import { ThunkDispatch } from "redux-thunk";
import { IDashboardState } from "../states/dashboardStates";
import api, { ISocialInteractionData, IVisitedPlaceData } from '../../lib/api';

const dashboardActions = {
  FETCH_DATA: 'DASHBOARD_FETCH_DATA',
  ADD_SOCIAL: 'DASHBOARD_ADD_SOCIAL',
  FETCH_SOCIAL: 'DASHBOARD_FETCH_SOCIAL',
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

export const dashboardFetchDataAction = 
(socialInteractions: ISocialInteractionData[], totalCountSocialInteractions: number, 
    visitedPlaces: IVisitedPlaceData[], totalCountVisitedPlaces: number) : IDashboardFetchDataAction => ({
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
(socialInteractions: ISocialInteractionData[], totalCountSocialInteractions: number) : IDashboardFetchSocialAction => ({
  type: dashboardActions.FETCH_SOCIAL,
  payload: {
    socialInteractions,
    totalCountSocialInteractions,
  },
});

export const performDashboardFetchSocialData = () => 
  async (dispatch: DashboardAppDispatch) => {
    const result = await Promise.all([
      api.getSocialInteractions(),
      // api.getVisitedPlaces(),
    ]);

    const totalCountSocialInteractions = result[0].length; // TODO
    // const totalCountVisitedPlaces = result[1].length; // TODO

    return dispatch(dashboardFetchSocialAction(
      result[0], 
      totalCountSocialInteractions // ,
      // result[1],
      // totalCountVisitedPlaces
    ));
  } 

export default dashboardActions;
