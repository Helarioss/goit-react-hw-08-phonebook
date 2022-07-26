import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/auth/authSlice';
import Container from '@mui/material/Container';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { UserMenu } from 'components/UserMenu';
import { NavLinkStyled } from './Layout.styled';
import { Spinner } from 'components/Spinner';

export const Layout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <>
      <AppBar position="static">
        <Toolbar component="nav">
          <Typography variant="h6" component="div">
            Phonebook
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isAuthenticated && (
            <div>
              <NavLinkStyled to="/login">Login</NavLinkStyled>
              <NavLinkStyled to="/register">Register</NavLinkStyled>
            </div>
          )}
          {isAuthenticated && <UserMenu />}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xl">
        <Suspense fallback={<Spinner height={250} width={250} />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
