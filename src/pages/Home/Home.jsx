import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/auth/authSlice';

const Home = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return isAuthenticated ? (
    <Navigate to="/contacts" />
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
