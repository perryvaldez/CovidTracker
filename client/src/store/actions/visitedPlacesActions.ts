import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import api, { FilterType } from '../../lib/api';
import { IVisitedPlacesState } from '../states/visitedPlacesStates';


const visitedPlacesActions = {
  FETCH_DATA: 'VISITED_PLACES_FETCH_DATA',
  CHANGE_PAGE: 'VISITED_PLACES_CHANGE_PAGE',
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
    const result = await Promise.all([
      api.getVisitedPlaces(filter, limit, offset),
      api.countVisitedPlaces({ to: filter.to }),
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

export default visitedPlacesActions;

