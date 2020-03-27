import {
  AsyncTuple,
  ActionType,
} from 'iron-redux';
import { prefix } from './types';
import actions from './actions';

class State {
}

/**
 * reducer
 */
export default (
  state = new State(),
  action: ActionType<typeof actions>
): State => {
  switch (action.type) {
    default: {
      return AsyncTuple.handleAll(prefix, state, action);
    }
  }
};
