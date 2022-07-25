import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSlice';
import { useGetCurrentUserQuery } from 'services/authApi';

export const useGetCurrentUser = () => {
  const isFirstRender = useRef(true);
  const token = useSelector(getToken);

  const { data, isFetching, isUninitialized } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !isFirstRender.current || !token,
    }
  );

  console.log('getCurrentUser', data, isFetching, isUninitialized);

  //   console.log('isFetching', isFetching);
  //   console.log('isUninitialized', isUninitialized);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return { isFetching, isUninitialized };
};
