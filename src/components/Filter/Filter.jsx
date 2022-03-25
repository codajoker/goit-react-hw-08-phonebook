import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/redux-action';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <label>
      find contact's by name{' '}
      <input
        onChange={e => dispatch(changeFilter(e.target.value))}
        name="filter"
        type="text"
      />
    </label>
  );
};
