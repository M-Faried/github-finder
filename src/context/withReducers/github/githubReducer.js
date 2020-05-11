import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  INITIAL_USERS_DISPLAYED,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case INITIAL_USERS_DISPLAYED:
      return {
        ...state,
        initialUsersDisplayed: true,
      };
    default:
      return state;
  }
};
