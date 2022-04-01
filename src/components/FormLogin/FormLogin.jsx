import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { logInUser } from 'redux/operetions';
import { useNavigate } from 'react-router-dom';
function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useSelector(state => state.auth.logIn);
  const name = useSelector(state => state.auth.user.name);
  let navigate = useNavigate();

  useEffect(() => {
    if (logIn) {
      navigate('../MyContact');

      toast.info(
        `
         Привет 🦄${name} ты вошел в аккаунт и теперь можешь воспользоваться контактами `,
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
  }, [logIn, name]);

  const dispatch = useDispatch();

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
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
    dispatch(logInUser({ email, password }));

    reset();
  };
  const reset = () => {
    setEmail('');
  };
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
export default FormLogin;
