import { Reducer } from 'redux';
import a, { ISocialInteractionsAction, ISocialInteractionsChangePageAction, ISocialInteractionsFetchDataAction } from '../actions/socialInteractionsActions';
import s, { ISocialInteractionsState, SocialInteractionsStartState as startState } from '../states/socialInteractionsStates';

const socialInteractionsReducer: Reducer<ISocialInteractionsState, ISocialInteractionsAction> =
(state = startState, action) => {
  switch(state.stateName) {
    case s.START:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as ISocialInteractionsFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.OUTDATED_DATA:
      if (action.type === a.FETCH_DATA) {
          const fetchAction = action as ISocialInteractionsFetchDataAction;

          return {
            ...state,
            stateName: s.READY,
            payload: { ...state.payload, ...fetchAction.payload },
          };
      }
      break;

    case s.READY:
      if (action.type === a.CHANGE_PAGE) {
          const fetchAction = action as ISocialInteractionsChangePageAction;

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

export default socialInteractionsReducer;

