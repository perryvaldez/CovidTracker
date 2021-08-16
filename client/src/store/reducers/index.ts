import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import notification from './notificationReducer';
import visitedPlaces from './visitedPlacesReducer';

const rootReducer = combineReducers({
    dashboard,
    notification,
    visitedPlaces,
});

export default rootReducer;
