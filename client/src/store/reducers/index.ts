import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import notification from './notificationReducer';

const rootReducer = combineReducers({
    dashboard,
    notification,
});

export default rootReducer;
