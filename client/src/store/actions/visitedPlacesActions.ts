import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType, IDeleteResult, IVisitedPlaceData } from '../../lib/api';
import { IVisitedPlacesState } from '../states/visitedPlacesStates';


const visitedPlacesActions = {
  FETCH_DATA: 'VISITED_PLACES_FETCH_DATA',
  CHANGE_PAGE: 'VISITED_PLACES_CHANGE_PAGE',
  ADD_DATA: 'VISITED_PLACES_ADD_DATA',
  EDIT_DATA: 'VISITED_PLACES_EDIT_DATA',
  DELETE_DATA: 'VISITED_PLACES_DELETE_DATA',
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

export const performVisitedPlacesFetchData = (filter: FilterType = {}, limit = 0, offset = 0, sort = '') => 
  async (dispatch: VisitedPlacesAppDispatch) => {
    const countFilter: {[key: string]: any } = { to: filter.to };
    if(filter.from) {
      countFilter.from = filter.from;
    }

    const result = await Promise.all([
      api.getVisitedPlaces(filter, limit, offset, [sort]),
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

/////
export interface IVisitedPlacesEditDataActionPayload {
    visitedPlace: IVisitedPlaceData;
  };
  
  export interface IVisitedPlacesEditDataAction extends IVisitedPlacesAction {
    payload: IVisitedPlacesEditDataActionPayload;
  };
  
  export const visitedPlacesEditDataAction = 
  (visitedPlace: IVisitedPlaceData) => ({
    type: visitedPlacesActions.EDIT_DATA,
    payload: {
      visitedPlace,
    },
  });
  
  export const performVisitedPlacesEditData = (id: string, data: IVisitedPlaceData) => 
    async (dispatch: VisitedPlacesAppDispatch) => {
      const result = await api.putVisitedPlace(id, data);
  
      return(dispatch(visitedPlacesEditDataAction(result)));
    };

/////
export interface IVisitedPlacesDeleteDataActionPayload {
    deleteResult: IDeleteResult;
  };
  
  export interface IVisitedPlacesDeleteDataAction extends IVisitedPlacesAction {
    payload: IVisitedPlacesDeleteDataActionPayload;
  };
  
  export const visitedPlacesDeleteDataAction = 
  (deleteResult: IDeleteResult) => ({
    type: visitedPlacesActions.DELETE_DATA,
    payload: {
      deleteResult,
    },
  });
  
  export const performVisitedPlacesDeleteData = (id: string) => 
    async (dispatch: VisitedPlacesAppDispatch) => {
      const result = await api.deleteVisitedPlace(id);
  
      return(dispatch(visitedPlacesDeleteDataAction(result)));
    };


export default visitedPlacesActions;

