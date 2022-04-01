import React from 'react';
import { useState, useEffect } from 'react';
import { addUser } from 'redux/operetions';

// import { Button, FormLabel } from './FormRegister.styled';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useSelector(state => state.auth.logIn);
  const stateName = useSelector(state => state.auth.user.name);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);

        break;
      case 'email':
        setEmail(value);

        break;
      case 'password':
        setPassword(value);

        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addUser({ name, email, password }));
    reset();
  };
  const reset = () => {
    setEmail('');
    setName('');
    setPassword('');
  };
  useEffect(() => {
    if (logIn) {
      navigate('../MyContact');

      toast.info(
        `
         Привет 🦄${stateName} ты вошел в аккаунт и теперь можешь воспользоваться контактами `,
        {
          position: 'top-center',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }, [logIn, stateName]);
  return (
    <>
      {logIn && (
        <>
          {' '}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={onChange}
            type="email"
            name="email"
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={onChange}
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={onChange}
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
export default FormRegister;
