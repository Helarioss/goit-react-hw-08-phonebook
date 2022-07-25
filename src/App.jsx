import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';
import { Home } from 'pages/Home';
import { Contacts } from 'pages/Contacts';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';
import { PageNotFound } from 'pages/PageNotFound';
import { useGetCurrentUser } from 'hooks/useGetCurrentUser';

export const App = () => {
  const { isFetching, isUninitialized } = useGetCurrentUser();
  // console.log('isFetching', isFetching);
  // console.log('isUninitialized', isUninitialized);
  console.log('renderApp');
  return (
    !isFetching && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="register"
            element={
              <PublicRoute navigateTo="/contacts">
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute navigateTo="/contacts">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute navigateTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  );
};
