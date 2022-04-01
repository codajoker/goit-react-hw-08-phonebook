import React from 'react';
import { useState } from 'react';
import { addItem } from 'redux/operetions';

import { Button } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  let contacts = useSelector(state => state.contacts.item);
  const dispatch = useDispatch();

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);

        break;
      case 'number':
        setNumber(value);

        break;
      default:
        break;
    }
  };
  const addContact = data => {
    if (
      contacts.find(contact => {
        return (
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
        );
      })
    ) {
      return alert(`${data.name} is already in contacts`);
    }
    dispatch(addItem(data));
  };
  const handleSubmit = e => {
    e.preventDefault();

    addContact({ name, number });
    reset();
  };
  const reset = () => {
    setNumber('');
    setName('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={name}
          onChange={onChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number{' '}
        <input
          value={number}
          onChange={onChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <Button type="submit">Add contact</Button>
    </form>
  );
}
export default Form;
