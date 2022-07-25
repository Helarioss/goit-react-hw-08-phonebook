import { UserMenu } from 'components/UserMenu';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/auth/authSlice';

export const Layout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <nav>
          {isAuthenticated ? (
            <NavLink to="/contacts">Contacts</NavLink>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
        {isAuthenticated && <UserMenu />}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
