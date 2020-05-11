import React, { useState, useContext } from 'react';
import { GithubContext } from '../../context/GithubContext';
import { AlertContext } from '../../context/AlertContext';

const Search = (props) => {
  const [text, setText] = useState('');
  const { showAlert } = useContext(AlertContext);
  const { users, searchUsers, clearUsers } = useContext(GithubContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter something in the search box.', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Search Users...'
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>

      {users && users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
