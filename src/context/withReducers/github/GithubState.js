import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import githubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  INITIAL_USERS_DISPLAYED,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    initialUsersDisplayed: false,
  };

  //Initializing the reducer.
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Sets loading flag to true or false.
  const setLoading = (value) => dispatch({ type: SET_LOADING, payload: value });

  //Gets the initial users of the repository
  const getInitialUsers = async () => {
    if (!state.initialUsersDisplayed) {
      dispatch({ type: INITIAL_USERS_DISPLAYED });
      //Update loading state.
      setLoading(true);

      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      // console.log(res);

      //Update the current state with data.
      setLoading(false);

      dispatch({ type: SEARCH_USERS, payload: res.data });
    }
  };

  //Search for users.
  const searchUsers = async (searchText) => {
    //Update loading state.
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Update the current state with data.
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
    setLoading(false);
  };

  //Get single Github user.
  const getUser = async (username) => {
    //Update loading state.
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Update the current state with data.
    setLoading(false);
    dispatch({ type: GET_USER, payload: res.data });
  };

  //Get user repos.
  const getUserRepos = async (username) => {
    //Update loading state.
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Update the current state with data.
    setLoading(false);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //Clear all current users.
  const clearUsers = () => {
    setLoading(false);
    dispatch({ type: CLEAR_USERS });
  };

  if (!state.initialUsersDisplayed) {
    getInitialUsers();
    dispatch({ type: INITIAL_USERS_DISPLAYED });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
