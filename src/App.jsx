// import { Section, Form, ListContact, Filter, MyContact } from './components';
import { useSelector } from 'react-redux';
import { token } from './redux/operetions';
import { Route, Routes } from 'react-router-dom';

// import { Navigation } from 'components/AppBar/AppBar';
// import { FormRegister } from 'components/FormRegister/FormRegister';
// import { FormLogin } from 'components/FormLogin/FormLogin';
import { lazy, Suspense, useEffect } from 'react';
import PrivateRoute from 'components/PrivateRoute/PrivateRout';
import PublicRoute from 'components/PublicRoute/PublicRoute';
const Section = lazy(() => import('./components/Section/Section'));
const Navigation = lazy(() => import('./components/AppBar/AppBar'));

const MyContact = lazy(() => import('./components/MyContact/MyContact'));
const FormRegister = lazy(() =>
  import('./components/FormRegister/FormRegister')
);
const FormLogin = lazy(() => import('./components/FormLogin/FormLogin'));

function App() {
  const isFetchingCurrentUser = useSelector(
    state => state.auth.isFetchingCurrentUser
  );
  const tokenUser = useSelector(state => state.auth.token);
  useEffect(() => {
    token.set(tokenUser);
  }, [tokenUser]);

  return (
    <>
      {!isFetchingCurrentUser && (
        <Suspense fallback={''}>
          <Navigation></Navigation>
          <Routes>
            <Route path="/" element={<Section />} />
            <Route
              path="register"
              element={
                <PublicRoute restricted>
                  <FormRegister />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute restricted>
                  <FormLogin />
                </PublicRoute>
              }
            />
            <Route
              path="MyContact"
              element={
                <PrivateRoute>
                  <MyContact />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      )}
      {/* <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contact">
        {contacts && (
          <>
            <Filter></Filter>
            <ListContact contacts={findContact()}></ListContact>
          </>
        )}
      </Section> */}
    </>
  );
}

export default App;
