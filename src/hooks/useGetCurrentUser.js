import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from 'redux/auth/authSlice';
import { useGetCurrentUserQuery } from 'services/authApi';

export const useGetCurrentUser = async () => {
  const isFirstRender = useRef(true);
  const token = useSelector(getToken);

  const { isFetching } = useGetCurrentUserQuery(undefined, {
    skip: !token || !isFirstRender.current,
    //   refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);

  return { isFetching };
};
