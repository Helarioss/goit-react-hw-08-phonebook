import { lazy, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSlice';
import { Route, Routes } from 'react-router-dom';

import { useLazyGetCurrentUserQuery } from 'services/authApi';
import { Layout } from 'components/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Contacts = lazy(() => import('pages/Contacts'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

export const App = () => {
  const isFirstRender = useRef(true);
  const token = useSelector(getToken);

  const [getCurrentUser, { isFetching }] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (isFirstRender.current && token) getCurrentUser();
    isFirstRender.current = false;
  }, [token, getCurrentUser]);

  /*Вариант ниже почему-то рендерит логин, как и оба варианта через кастомный хук.
  const isFirstRender = useRef(true);
  const token = useSelector(getToken);

  const { isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !token || !isFirstRender.current,
  });

  useEffect(() => {
    isFirstRender.current = false;
  }, []);*/

  if (!isFetching)
    return (
      <>
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
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-left" />
      </>
    );
};
