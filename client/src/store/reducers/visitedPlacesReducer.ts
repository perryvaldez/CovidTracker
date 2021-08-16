import { Reducer } from 'redux';
import a, { IVisitedPlacesAction, IVisitedPlacesChangePageAction, IVisitedPlacesFetchDataAction } from '../actions/visitedPlacesActions';
import s, { IVisitedPlacesState, VisitedPlacesStartState as startState } from '../states/visitedPlacesStates';

const visitedPlacesReducer: Reducer<IVisitedPlacesState, IVisitedPlacesAction> =
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as IVisitedPlacesFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.OUTDATED_DATA:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as IVisitedPlacesFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.READY:
      if (action.type === a.CHANGE_PAGE) {
          const fetchAction = action as IVisitedPlacesChangePageAction;

          return {
            ...state,
            stateName: s.OUTDATED_DATA,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;
  }

  return state;
};

export default visitedPlacesReducer;

