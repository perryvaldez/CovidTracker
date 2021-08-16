import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import notification from './notificationReducer';
import visitedPlaces from './visitedPlacesReducer';
import socialInteractions from './socialInteractionsReducer';

const rootReducer = combineReducers({
    dashboard,
    notification,
    visitedPlaces,
    socialInteractions,
});

export default rootReducer;
