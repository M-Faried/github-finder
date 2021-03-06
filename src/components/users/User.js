import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { GithubContext } from '../../context/GithubContext';

const User = (props) => {
  const siteName = process.env.REACT_APP_WEBSITE_NAME;

  const { loading, repos, user, getUser, getUserRepos } = useContext(
    GithubContext
  );

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  useEffect(() => {
    getUser(props.match.params.login);
    getUserRepos(props.match.params.login);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {/* Back To The Search Results Page. */}
        <Link to={`/${siteName}/`} className='btn btn-light'>
          Back To Search
        </Link>

        <div className='card grid-2'>
          {/* Left Part of the intro */}
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              style={{ width: '150px' }}
              alt=''
            />
            <h1>{name}</h1>
            {location && <p>Location: {location}</p>}
            <p>
              Hireable:{' '}
              {hireable ? (
                <i className='fas fa-check text-success' />
              ) : (
                <i className='fas fa-times-circle text-danger' />
              )}
            </p>
          </div>

          {/* Right part of the intro */}
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>

            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers} </div>
          <div className='badge badge-success'>Following: {following} </div>
          <div className='badge badge-light'>Public Repos: {public_repos} </div>
          <div className='badge badge-dark'>Public Gists: {public_gists} </div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
