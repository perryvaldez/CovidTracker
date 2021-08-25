import { Reducer } from 'redux';
import a, { 
  IVisitedPlacesAction, 
  IVisitedPlacesAddDataAction, 
  IVisitedPlacesChangePageAction, 
  IVisitedPlacesEditDataAction, 
  IVisitedPlacesFetchDataAction,
} from '../actions/visitedPlacesActions';
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

      if (action.type === a.ADD_DATA) {
        const fetchAction = action as IVisitedPlacesAddDataAction;

        return {
          ...state,
          stateName: s.OUTDATED_DATA,
          payload: { ...state.payload, ...fetchAction.payload },
        };
      }

      if (action.type === a.EDIT_DATA) {
        const fetchAction = action as IVisitedPlacesEditDataAction;

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

