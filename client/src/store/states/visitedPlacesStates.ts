import { IDeleteResult } from "../../lib/api";

const visitedPlacesStates = {
  START: 'VISITED_PLACES_START',
  READY: 'VISITED_PLACES_READY',
  OUTDATED_DATA: 'VISITED_PLACES_OUTDATED_DATA',
};

export interface IVisitedPlacesPayload {
  data: any[];
  totalCount: number;
  deleteResult: IDeleteResult;
};

export interface IVisitedPlacesState {
  stateName: string;
  payload: IVisitedPlacesPayload;
};

export const VisitedPlacesStartState: IVisitedPlacesState = {
  stateName: visitedPlacesStates.START,
  payload: {
    data: [],
    totalCount: 0,
    deleteResult: { msg: '' },
  },
};

export default visitedPlacesStates;

