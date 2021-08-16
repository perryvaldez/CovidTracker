const visitedPlacesStates = {
  START: 'VISITED_PLACES_START',
  READY: 'VISITED_PLACES_READY',
};

export interface IVisitedPlacesPayload {
  data: any[];
  totalCount: number;
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
  },
};

export default visitedPlacesStates;

