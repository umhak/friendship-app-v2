import {ActionTypes} from '../actions/users';

export const initialState = {
  isLoading: false,
  checkingUsername: false,
  checkingEmail: false,
  userList: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.USERS_RECEIVE:
      return {
        ...state,
        userList: action.userList,
        isLoading: false,
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.USERS_VALIDATE_USERNAME:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.USERS_VALIDATE_EMAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
