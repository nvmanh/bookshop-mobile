import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast, Portal } from '@ant-design/react-native';
import { Types } from './types';
import actions, { signIn, logout, getUserInfo, signUp } from './actions';
import { fetchService } from '../fetchService';
import { CUSTOMER_TOKEN } from '../../config/Constants';

function* signInService(action: ReturnType<typeof signIn>) {
  const { payload } = action;
  try {
    const api = actions.fetchSignIn({
      username: payload.username,
      password: payload.password
    });
    // const api = actions.fetchSignIn()
    const res: typeof api.payload = yield* fetchService(api);
    if (res) {
      const { data: token } = res;
      yield AsyncStorage.setItem(CUSTOMER_TOKEN, token);
      yield put(actions.changeToken(token));

      // get user info
      yield put(getUserInfo());
    }
  } catch (error) {
    console.log('service', error);
    // yield put({ type: API_TYPES.SIGN_IN_FAILURE, payload: { errorMessage: error.message } });
  }
}

function* signUpService(action: ReturnType<typeof signUp>) {
  const { payload } = action;
  try {
    const api = actions.fetchSignUp({
      username: payload.username,
      password: payload.password,
      age: payload.age,
      email1: payload.email,
      phone1: payload.phone,
    });
    // const api = actions.fetchSignIn()
    const res: typeof api.payload = yield* fetchService(api);
    if (res) {
      const { data } = res;
      // console.log(">>>>>>>>>>>>>>>>>>> ", data);
      // yield put(actions.registerUserSuccess(data))

      // const { data: token } = res;
      // yield AsyncStorage.setItem(CUSTOMER_TOKEN, token);
      // yield put(actions.changeToken(token));

      // get user info
      // yield put(getUserInfo());
    }
  } catch (error) {
    console.log('service', error);
    // yield put({ type: API_TYPES.SIGN_IN_FAILURE, payload: { errorMessage: error.message } });
  }
}

function* logoutService(action: ReturnType<typeof logout>) {
  const loadKey = Toast.loading('loading...', 0);
  try {
    const api = actions.fetchLogout();
    const res: typeof api.payload = yield* fetchService(api);
    if (res) {
      yield AsyncStorage.removeItem(CUSTOMER_TOKEN);
      yield put(actions.changeToken(''));
      Portal.remove(loadKey);
      Toast.success('Success', 1.5);
    }
  } catch (error) {
    Portal.remove(loadKey);
    yield AsyncStorage.removeItem(CUSTOMER_TOKEN);
    yield put(actions.changeToken(''));
    console.log('service', error);
  }
}

function* getUserInfoService(action: ReturnType<typeof getUserInfo>) {
  const { payload } = action;
  try {
    const api = actions.fetchUserInfo();
    const res: typeof api.payload = yield* fetchService(api);
    if (res) {
      // TODO:  AsyncStorage
    }
  } catch (error) {
    console.log('service', error);
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(Types.signIn, signInService);
  yield takeLatest(Types.logout, logoutService);
  yield takeLatest(Types.getUserInfo, getUserInfoService);
  yield takeLatest(Types.signUp, signUpService);
}
