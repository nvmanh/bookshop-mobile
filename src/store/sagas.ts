import { fork } from 'redux-saga/effects';

// import homeSagas from './home/sagas';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';
import homeSagas from './home/sagas';

/**
 * rootSaga
 */
export default function* root() {
  // yield fork(homeSagas);
  yield fork(appSagas);
  yield fork(authSagas);
  yield fork(homeSagas);
}
