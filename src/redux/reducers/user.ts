import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

type ActionType = {
  type: string;
  payload: string;
};

function user(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case SAVE_USER:
      return {
        email: action.payload,
      };
    default:
      return state;
  }
}

export default user;
