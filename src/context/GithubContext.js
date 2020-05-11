import React, { createContext, useState } from 'react';
import axios from 'axios';

export const GithubContext = createContext();

export const GithubContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initUserLoaded, setInitUserLoaded] = useState(false);

  //Search for users.
  const searchUsers = async (searchText) => {
    //Update loading state.
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Update the current state with data.
    setUsers(res.data.items);
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
    setUser(res.data);
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
    setUserRepos(res.data);
  };

  //Clear all current users.
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };

  //Gets the initial users of the repository
  const loadInitialUsers = async () => {
    //Update loading state.
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //Update the current state with data.
    setLoading(false);
    setUsers(res.data);
  };

  //Loading the initial sample of users once at the start up.
  if (!initUserLoaded) {
    loadInitialUsers();
    setInitUserLoaded(true);
  }

  const provideValue = {
    users,
    user,
    repos: userRepos,
    loading,
    searchUsers,
    getUser,
    getUserRepos,
    clearUsers,
  };

  return (
    <GithubContext.Provider value={provideValue}>
      {props.children}
    </GithubContext.Provider>
  );
};

export const GithubContextConsumer = (props) => {
  return <GithubContext.Consumer>{props.children}</GithubContext.Consumer>;
};
