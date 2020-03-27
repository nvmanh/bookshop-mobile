import {
  composeTypes,
  createAction,
  ActionCreator,
  AsyncTuple,
  NO_ERROR_TYPES,
  createFetchAction,
  ThunkAction,
  ActionType,
  safeGet,
  Method,
} from 'iron-redux';
import Network from '../../config/Network';
import { Types } from './types';

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */

interface FetchSignInReq {
  username: string;
  password: string;
}

interface FetchSignUpReq {
  username: string;
  password: string;
  age: number;
  email1: string;
  phone1: string;
}
export interface FetchSignInRes {
  data: string;
}

export interface FetchSignUpRes {
  data: object;
}
const fetchSignInUrl = `${Network.API_ROOT_DOMAIN}/auth`;
const fetchSignIn = createFetchAction(Types.fetchSignIn, fetchSignInUrl, Method.Post)<FetchSignInReq, FetchSignInRes>('fetchSignIn');

const fetchSignUpUrl = `${Network.API_ROOT_DOMAIN}/user/regist`;
const fetchSignUp = createFetchAction(Types.fetchSignUp, fetchSignUpUrl, Method.Post)<FetchSignUpReq, FetchSignUpRes>('fetchSignUp');

interface FetchLogoutReq {
}
export interface FetchLogoutRes {
}
const fetchLogoutUrl = `${Network.API_ROOT_DOMAIN}/logout`;
const fetchLogout = createFetchAction(Types.fetchLogout, fetchLogoutUrl, Method.Post)<FetchLogoutReq, FetchLogoutRes>('fetchLogout');

interface FetchUserInfoReq {
}
export interface FetchUserInfoRes {
  name: string;
}
const fetchUserInfoUrl = `${Network.API_ROOT_DOMAIN}/me`;
const fetchUserInfo = createFetchAction(Types.fetchUserInfo, fetchUserInfoUrl, Method.Get)<FetchUserInfoReq, FetchUserInfoRes>('fetchUserInfo');


// fetch state
const clearFetchSignIn = createAction(Types.clearFetchSignIn)();

const clearFetchSignUp = createAction(Types.clearFetchSignUp)();

// change token
const changeToken = createAction(Types.changeToken, 'token')<string>();

const registerUserSuccess = createAction(Types.signUpSucces, "user")<object>();

export default {
  changeToken,
  fetchSignIn,
  fetchSignUp,
  registerUserSuccess,
  clearFetchSignIn,
  clearFetchSignUp,
  fetchLogout,
  fetchUserInfo
};

/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */

interface SignInParams {
  username: string;
  password: string;
}

interface SignUpParams {
  username: string;
  password: string;
  age: number;
  phone: string;
  email: string;
}
export const signIn = createAction(Types.signIn)<SignInParams>();

export const signUp = createAction(Types.signUp)<SignUpParams>();

export const logout = createAction(Types.logout)();

export const getUserInfo = createAction(Types.getUserInfo)();

// interface GetUsersParams {
//   page: number;
//   limit: number;
//   callback: (res: FetchUsersRes) => any;
// }
// export const getUsers = createAction(Types.getUsers)<GetUsersParams>()