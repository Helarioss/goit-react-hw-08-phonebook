import { UserMenu } from 'components/UserMenu';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/auth/authSlice';
import Container from '@mui/material/Container';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const Layout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <>
      <Container component="header" maxWidth="xs">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              Phonebook
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {isAuthenticated ? (
              <NavLink to="/contacts">Contacts</NavLink>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>

        <nav></nav>
        {isAuthenticated && <UserMenu />}
      </Container>

      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
    </>
  );
};
