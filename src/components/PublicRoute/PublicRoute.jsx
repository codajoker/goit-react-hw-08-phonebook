import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, restricted = false }) => {
  const auth = useSelector(state => state.auth.logIn);
  const shouldRedirect = restricted && auth;
  console.log('shouldRedirect :', shouldRedirect);
  return shouldRedirect ? <Navigate to="/MyContact" /> : children;
};

export default PublicRoute;
