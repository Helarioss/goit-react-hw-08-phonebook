import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { Contacts } from 'pages/Contacts';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';
import { PageNotFound } from 'pages/PageNotFound';
import { useEffect } from 'react';
import { useLazyGetCurrentUserQuery } from 'services/authApi';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSlice';
import { useRef } from 'react';

export const App = () => {
  const isFirstRender = useRef(true);
  const token = useSelector(getToken);
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (isFirstRender.current && token) {
      isFirstRender.current = false;
      getCurrentUser();
    }
  }, [token, getCurrentUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Phonebook</div>} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
