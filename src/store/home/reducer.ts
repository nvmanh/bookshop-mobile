import {
    AsyncTuple,
    ActionType,
  } from 'iron-redux';
  import { Types, prefix } from './types';
  import actions, { FetchAuthorRes, FetchBookRes } from './actions';
  
  // 1. Complex properties can be written with comments as much as possible so that they can be identified when called
  // 2. Use AsyncTuple to manage asynchronously retrieved data. Do not have various loading and error fields in InitialState
  // 3. Name the initial state as State, so that both the initial value of state and the type definition of state can be generated.
  // 4. Naming convention: API prefix plus fetch
  
  const fetchAuthor = new AsyncTuple<FetchAuthorRes>(false);
  const fetchBook = new AsyncTuple<FetchBookRes>(false);

  class State {
    public fetchBook = fetchBook;
    public fetchAuthor = fetchAuthor;
  }
  
  /**
   * reducer
   */
  export default (
    state = new State(),
    action: ActionType<typeof actions>
  ): State => {
    switch (action.type) {
      case Types.clearFetchAuthor: {
        return { ...state, fetchAuthor};
      }
      case Types.clearFetchBook: {
        return { ...state, fetchBook };
      }
      default: {
        return AsyncTuple.handleAll(prefix, state, action);
      }
    }
  };
  