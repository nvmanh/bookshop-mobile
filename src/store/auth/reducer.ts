import {
  AsyncTuple,
  ActionType,
} from 'iron-redux';
import { Types, prefix } from './types';
import actions, { FetchSignInRes, FetchUserInfoRes, FetchSignUpRes } from './actions';

// 1. Complex properties can be written with comments as much as possible so that they can be identified when called
// 2. Use AsyncTuple to manage asynchronously retrieved data. Do not have various loading and error fields in InitialState
// 3. Name the initial state as State, so that both the initial value of state and the type definition of state can be generated.
// 4. Naming convention: API prefix plus fetch

const fetchSignIn = new AsyncTuple<FetchSignInRes>(false);
const fetchLogout = new AsyncTuple(false);
const fetchUserInfo = new AsyncTuple<FetchUserInfoRes>(false);
const fetchSignUp = new AsyncTuple<FetchSignUpRes>(false);
class State {
  public token = '';
  public user = {};
  public fetchSignIn = fetchSignIn;
  public fetchLogout = fetchLogout;
  public fetchUserInfo = fetchUserInfo;
  public fetchSignUp = fetchSignUp;
}

/**
 * reducer
 */
export default (
  state = new State(),
  action: ActionType<typeof actions>
): State => {
  switch (action.type) {
    case Types.clearFetchSignIn: {
      return { ...state, fetchSignIn, fetchSignUp };
    }
    case Types.clearFetchSignUp: {
      return { ...state, fetchSignUp };
    }
    default: {
      return AsyncTuple.handleAll(prefix, state, action);
    }
  }
};
