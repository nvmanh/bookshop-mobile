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
} from 'iron-redux';

/**
 * types
 */
const prefix = 'auth/';

enum BasicTypes {
  changeToken,
  signIn,
  signUp,
  signUpSucces,
  logout,
  clearFetchSignIn,
  clearFetchSignUp,
  getUserInfo,
}

enum FetchTypes {
  fetchSignIn,
  fetchSignUp,
  fetchLogout,
  fetchUserInfo,
}

const Types = composeTypes({
  prefix,
  BasicTypes,
  FetchTypes,
});

export { Types, prefix };
