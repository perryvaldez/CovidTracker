import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType } from '../../lib/api';
import { ISocialInteractionsState } from '../states/socialInteractionsStates';


const socialInteractionsActions = {
  FETCH_DATA: 'SOCIAL_INTERACTIONS_FETCH_DATA',
  CHANGE_PAGE: 'SOCIAL_INTERACTIONS_CHANGE_PAGE',
};

export interface ISocialInteractionsAction {
  type: string;
};

export type SocialInteractionsAppDispatch = ThunkDispatch<ISocialInteractionsState, any, ISocialInteractionsAction>;
export const useSocialInteractionsDispatch = (): SocialInteractionsAppDispatch => useDispatch();

export interface ISocialInteractionsFetchDataActionPayload {
  data: any[];
  totalCount: number;
};

export interface ISocialInteractionsFetchDataAction extends ISocialInteractionsAction {
  payload: ISocialInteractionsFetchDataActionPayload;
};

export const socialInteractionsFetchDataAction = 
(data: any[], totalCount: number) => ({
  type: socialInteractionsActions.FETCH_DATA,
  payload: {
    data,
    totalCount,
  },
});

export const performSocialInteractionsFetchData = (filter: FilterType = {}, limit = 0, offset = 0) => 
  async (dispatch: SocialInteractionsAppDispatch) => {
    const result = await Promise.all([
      api.getSocialInteractions(filter, limit, offset),
      api.countSocialInteractions({ to: filter.to }),
    ]);

    const [data, totalCount] = result;

    return(dispatch(socialInteractionsFetchDataAction(data, totalCount)));
  };

/////////////

export interface ISocialInteractionsChangePageActionPayload {
};

export interface ISocialInteractionsChangePageAction extends ISocialInteractionsAction {
  payload: ISocialInteractionsChangePageActionPayload;
};

export const socialInteractionsChangePageAction = 
() => ({
  type: socialInteractionsActions.CHANGE_PAGE,
  payload: {},
});

export const performSocialInteractionsChangePage = () => 
  async (dispatch: SocialInteractionsAppDispatch) => {
    return(dispatch(socialInteractionsChangePageAction()));
  };

export default socialInteractionsActions;


