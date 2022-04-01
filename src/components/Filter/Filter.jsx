import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/redux-redesers';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  return (
    <label>
      find contact's by name{' '}
      <input
        onChange={e => dispatch(changeFilter(e.target.value))}
        name="filter"
        type="text"
        defaultValue={filter}
      />
    </label>
  );
};
export default Filter;
