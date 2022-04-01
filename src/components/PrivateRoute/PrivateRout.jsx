import MyContact from 'components/MyContact/MyContact';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ children }) {
  const auth = useSelector(state => state.auth.logIn);
  return auth ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
