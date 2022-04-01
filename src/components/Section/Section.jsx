import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Section = ({ children }) => {
  const logIn = useSelector(state => state.auth.logIn);
  const name = useSelector(state => state.auth.user.name);

  useEffect(() => {
    if (logIn) {
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

  return (
    <section>
      {logIn ? (
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
          <h1> Hello</h1>
        </>
      ) : (
        <h2 style={{ textAlign: 'center' }}>
          {' '}
          Приветствуем. Зарегистрируйтесь или войдите в аккаунт чтобы
          пользоваться нашими услугами{' '}
        </h2>
      )}

      {children}
    </section>
  );
};
Section.propTypes = {
  children: PropTypes.node,
};
export default Section;
