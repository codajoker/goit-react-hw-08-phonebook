import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, Button } from './ListContact.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/operetions';
export const ListContact = ({ contacts }) => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.contacts.loader);

  return (
    <List>
      {contacts.map(contact => {
        return (
          <ListItem key={contact.id}>
            {contact.name}: {contact.phone}
            {loader ? (
              <Button disabled onClick={() => dispatch(removeItem(contact.id))}>
                {' '}
                Delete{' '}
              </Button>
            ) : (
              <Button onClick={() => dispatch(removeItem(contact.id))}>
                {' '}
                Delete
              </Button>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
ListContact.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
