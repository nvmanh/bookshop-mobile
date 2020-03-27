import { combineReducers } from 'redux';
// import homeReducer from './home/reducer';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import bookReducer from './home/reducer';

export const rootReducers = {
  // home: homeReducer,
  app: appReducer,
  auth: authReducer,
  sign: authReducer,
  home: bookReducer,
};
const rootReducer = combineReducers(rootReducers);

export default rootReducer;
