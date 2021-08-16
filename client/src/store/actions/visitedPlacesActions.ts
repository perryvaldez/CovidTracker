import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import /* api, */ { FilterType } from '../../lib/api';
import { IVisitedPlacesState } from '../states/visitedPlacesStates';


const visitedPlacesActions = {
  FETCH_DATA: 'VISITED_PLACES_FETCH_DATA',
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

export const performVisitedPlacesFetchData = (filter: FilterType = {}) => 
  async (dispatch: VisitedPlacesAppDispatch) => {
    // const result = await Promise.all([]);
    const [data, totalCount] = [[], 0]

    return(dispatch(visitedPlacesFetchDataAction(data, totalCount)));
  };

export default visitedPlacesActions;

