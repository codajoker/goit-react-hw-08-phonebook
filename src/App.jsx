import { Section, Form, ListContact, Filter } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItem, addItem } from './redux/operetions';
import { useEffect } from 'react';
function App() {
  let contacts = useSelector(state => state.contacts.item);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);
  useEffect(() => {
    dispatch(fetchItem());
  }, []);

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

  const findContact = () => {
    const filterContact = contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });
    return filterContact;
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contact">
        {contacts && (
          <>
            <Filter></Filter>
            <ListContact contacts={findContact()}></ListContact>
          </>
        )}
      </Section>
    </>
  );
}

export default App;
