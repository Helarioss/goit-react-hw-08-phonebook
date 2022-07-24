import { UserMenu } from 'components/UserMenu';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
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
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
        </nav>
        <UserMenu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
