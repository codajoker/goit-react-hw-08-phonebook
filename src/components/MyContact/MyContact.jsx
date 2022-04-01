// import { Filter, Form, ListContact } from 'components';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { fetchItem } from 'redux/operetions';
const Form = lazy(() => import('components/Form/Form'));
const ListContact = lazy(() => import('components/ListContact/ListContact'));
const Filter = lazy(() => import('components/Filter/Filter'));
const MyContact = () => {
  const dispatch = useDispatch();
  const logIn = useSelector(state => state.auth.logIn);
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchItem());
  }, []);
  useEffect(() => {
    if (!logIn) {
      navigate('../');
    }
  }, [logIn]);
  return (
    <>
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
      <Suspense fallback="">
        <Form></Form>
        <Filter></Filter>
        <ListContact></ListContact>
      </Suspense>
    </>
  );
};
export default MyContact;
