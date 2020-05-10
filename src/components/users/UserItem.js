import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
  const { avatar_url, login } = props.user;
  const websiteName = process.env.REACT_APP_WEBSITE_NAME;
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='avatar'
        className='round-img'
        style={{ width: '60px' }}
      />

      <h3>{login}</h3>

      <div>
        <Link
          to={`/${websiteName}/user/${login}`}
          className='btn btn-dark btn-sm my-1'
        >
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
