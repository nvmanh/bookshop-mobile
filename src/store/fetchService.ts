
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Portal from '@ant-design/react-native/lib/portal';
import Modal from '@ant-design/react-native/lib/modal';
import { portal } from '@ant-design/react-native/lib/portal/portal-host';
import { Actions } from 'react-native-router-flux';
import Request from '../utils/Request';
import authActions, { logout } from './auth/actions';
import { CUSTOMER_TOKEN } from '../config/Constants';

/**
 * @param action
 * @param loading
 * @param success
 * @param error
 */
export function* fetchService(action: any, loading: boolean = true, success: boolean = true, error: boolean = true) {
  const { types, url, stateKey, method, params, meta, ...rest } = action;
  try {
    // loading
    if (loading) {
      yield put({ type: types.loading, url, stateKey });
    }
    // fetch
    const met = (method as string).toLowerCase();
    const req: any = { url, method: met };
    if (met === 'get') {
      req.params = params;

    } else {
      // req.data = params;
      req.data = JSON.stringify(params)
      // console.log(req.data);
    }
    const res = yield Request(req);
    console.log("status >>>>>>>>>>>>>>>>>>> ", res.status);
    if(res.status && (res.status == 200 || res.status ==201)){
      yield put({ type: types.success, url, stateKey, payload: res.data });
      return res;
    }

    if (res.code !== 1 && res.code !== 20000) {

      // token 
      if (res.code === 0) {

        yield put({ type: types.error, url, stateKey, payload: { message: 'Your login session has expired' }});

        // https://github.com/ant-design/ant-design-mobile-rn/issues/524
        Portal.remove(portal.nextKey - 1);

        Modal.alert('Tip', 'Your login has expired, you can cancel to stay on this page, or log in again', [
          { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
          { text: 'Login', onPress: () => { Actions.login() }, }
        ]);

        // yield put(logout());
        yield AsyncStorage.removeItem(CUSTOMER_TOKEN);
        yield put(authActions.changeToken(''));

      } else {
        // error
        throw new Error(res.msg || res.message || 'Error');
      }
    }

    if (success) {
      yield put({ type: types.success, url, stateKey, payload: res.data });
    }
    return res;
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>> ", e);
    
    if (error) {
      yield put({ type: types.error, url, stateKey, payload: { message: e.message }});
    } else {
      throw e;
    }
  }
}
