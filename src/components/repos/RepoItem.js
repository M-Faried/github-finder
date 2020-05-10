import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
  const { name, html_url } = repo;
  return (
    <div className='card'>
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;
