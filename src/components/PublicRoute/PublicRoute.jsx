import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/auth/authSlice';

export const PublicRoute = ({ children, navigateTo }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return !isAuthenticated ? children : <Navigate to={navigateTo} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node,
  navigateTo: PropTypes.string.isRequired,
};
