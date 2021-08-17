import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType, IVisitedPlaceData } from '../../lib/api';
import { IVisitedPlacesState } from '../states/visitedPlacesStates';


const visitedPlacesActions = {
  FETCH_DATA: 'VISITED_PLACES_FETCH_DATA',
  CHANGE_PAGE: 'VISITED_PLACES_CHANGE_PAGE',
  ADD_DATA: 'VISITED_PLACES_ADD_DATA',
};

export interface IVisitedPlacesAction {
  type: string;
};

export type VisitedPlacesAppDispatch = ThunkDispatch<IVisitedPlacesState, any, IVisitedPlacesAction>;
export const useVisitedPlacesDispatch = (): VisitedPlacesAppDispatch => useDispatch();

export interface IVisitedPlacesFetchDataActionPayload {
  data: any[];
  totalCount: number;
};

export interface IVisitedPlacesFetchDataAction extends IVisitedPlacesAction {
  payload: IVisitedPlacesFetchDataActionPayload;
};

export const visitedPlacesFetchDataAction = 
(data: any[], totalCount: number) => ({
  type: visitedPlacesActions.FETCH_DATA,
  payload: {
    data,
    totalCount,
  },
});

export const performVisitedPlacesFetchData = (filter: FilterType = {}, limit = 0, offset = 0) => 
  async (dispatch: VisitedPlacesAppDispatch) => {
    const countFilter: {[key: string]: any } = { to: filter.to };
    if(filter.from) {
      countFilter.from = filter.from;
    }

    const result = await Promise.all([
      api.getVisitedPlaces(filter, limit, offset),
      api.countVisitedPlaces(countFilter),
    ]);

    const [data, totalCount] = result;

    return(dispatch(visitedPlacesFetchDataAction(data, totalCount)));
  };

/////////////

export interface IVisitedPlacesChangePageActionPayload {
};

export interface IVisitedPlacesChangePageAction extends IVisitedPlacesAction {
  payload: IVisitedPlacesChangePageActionPayload;
};

export const visitedPlacesChangePageAction = 
() => ({
  type: visitedPlacesActions.CHANGE_PAGE,
  payload: {},
});

export const performVisitedPlacesChangePage = () => 
  async (dispatch: VisitedPlacesAppDispatch) => {
    return(dispatch(visitedPlacesChangePageAction()));
  };

/////
export interface IVisitedPlacesAddDataActionPayload {
    visitedPlace: IVisitedPlaceData;
  };
  
  export interface IVisitedPlacesAddDataAction extends IVisitedPlacesAction {
    payload: IVisitedPlacesAddDataActionPayload;
  };
  
  export const visitedPlacesAddDataAction = 
  (visitedPlace: IVisitedPlaceData) => ({
    type: visitedPlacesActions.ADD_DATA,
    payload: {
      visitedPlace,
    },
  });
  
  export const performVisitedPlacesAddData = (data: IVisitedPlaceData) => 
    async (dispatch: VisitedPlacesAppDispatch) => {
      const id = await api.postVisitedPlace(data);
      data._id = id;
  
      return(dispatch(visitedPlacesAddDataAction(data)));
    };

export default visitedPlacesActions;

