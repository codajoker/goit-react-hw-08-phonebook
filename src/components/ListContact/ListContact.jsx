import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from './ListContact.styled';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/operetions';
import { Button } from '@mui/material';
const ListContact = () => {
  const contacts = useSelector(state => state.contacts.item);
  const dispatch = useDispatch();
  const loader = useSelector(state => state.contacts.loader);
  const filter = useSelector(state => state.contacts.filter);
  let filterContact = useMemo(
    () =>
      contacts.filter(contact => {
        return contact.name
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      }),
    [contacts, filter]
  );

  return (
    <List>
      {filterContact.map(contact => {
        return (
          <ListItem key={contact.id}>
            {contact.name}: {contact.number}
            {loader ? (
              <Button
                sx={{
                  marginLeft: '15px',
                }}
                variant="outlined"
                color="error"
                disabled
                onClick={() => dispatch(removeItem(contact.id))}
              >
                {' '}
                Delete{' '}
              </Button>
            ) : (
              <Button
                sx={{
                  marginLeft: '15px',
                }}
                variant="outlined"
                color="error"
                onClick={() => dispatch(removeItem(contact.id))}
              >
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
export default ListContact;
