import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType, IDeleteResult, ISocialInteractionData } from '../../lib/api';
import { ISocialInteractionsState } from '../states/socialInteractionsStates';


const socialInteractionsActions = {
  FETCH_DATA: 'SOCIAL_INTERACTIONS_FETCH_DATA',
  CHANGE_PAGE: 'SOCIAL_INTERACTIONS_CHANGE_PAGE',
  ADD_DATA: 'SOCIAL_INTERACTIONS_ADD_DATA',
  EDIT_DATA: 'SOCIAL_INTERACTIONS_EDIT_DATA',
  DELETE_DATA: 'SOCIAL_INTERACTIONS_DELETE_DATA',
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

export const performSocialInteractionsFetchData = (filter: FilterType = {}, limit = 0, offset = 0, sort = '') => 
  async (dispatch: SocialInteractionsAppDispatch) => {
    const countFilter: {[key: string]: any } = { to: filter.to };
    if(filter.from) {
      countFilter.from = filter.from;
    }

    const result = await Promise.all([
      api.getSocialInteractions(filter, limit, offset, [sort]),
      api.countSocialInteractions(countFilter),
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

///

export interface ISocialInteractionsAddDataActionPayload {
  socialInteraction: ISocialInteractionData;
};

export interface ISocialInteractionsAddDataAction extends ISocialInteractionsAction {
  payload: ISocialInteractionsAddDataActionPayload;
};

export const socialInteractionsAddDataAction = 
(socialInteraction: ISocialInteractionData) => ({
  type: socialInteractionsActions.ADD_DATA,
  payload: {
    socialInteraction,
  },
});

export const performSocialInteractionsAddData = (data: ISocialInteractionData) => 
  async (dispatch: SocialInteractionsAppDispatch) => {
    const id = await api.postSocialInteraction(data);
    data._id = id;

    return(dispatch(socialInteractionsAddDataAction(data)));
  };

///

export interface ISocialInteractionsEditDataActionPayload {
  socialInteraction: ISocialInteractionData;
};

export interface ISocialInteractionsEditDataAction extends ISocialInteractionsAction {
  payload: ISocialInteractionsEditDataActionPayload;
};

export const socialInteractionsEditDataAction = 
(socialInteraction: ISocialInteractionData) => ({
  type: socialInteractionsActions.EDIT_DATA,
  payload: {
    socialInteraction,
  },
});

export const performSocialInteractionsEditData = (id: string, data: ISocialInteractionData) => 
  async (dispatch: SocialInteractionsAppDispatch) => {
    const result = await api.putSocialInteraction(id, data);

    return(dispatch(socialInteractionsEditDataAction(result)));
  };

/////
export interface ISocialInteractionsDeleteDataActionPayload {
    deleteResult: IDeleteResult;
  };
  
  export interface ISocialInteractionsDeleteDataAction extends ISocialInteractionsAction {
    payload: ISocialInteractionsDeleteDataActionPayload;
  };
  
  export const socialInteractionsDeleteDataAction = 
  (deleteResult: IDeleteResult) => ({
    type: socialInteractionsActions.DELETE_DATA,
    payload: {
      deleteResult,
    },
  });
  
  export const performSocialInteractionsDeleteData = (id: string) => 
    async (dispatch: SocialInteractionsAppDispatch) => {
      const result = await api.deleteSocialInteraction(id);
  
      return(dispatch(socialInteractionsDeleteDataAction(result)));
    };


export default socialInteractionsActions;
