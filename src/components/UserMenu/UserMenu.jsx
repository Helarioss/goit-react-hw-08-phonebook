import { useSelector } from 'react-redux';
import { getEmail } from 'redux/auth/authSlice';
import { useLogoutMutation } from 'services/authApi';

export const UserMenu = () => {
  const email = useSelector(getEmail);

  const [logout, { isLoading }] = useLogoutMutation();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>{email}</p>
      <button type="button" disabled={isLoading} onClick={logout}>
        Logout
      </button>
    </div>
  );
};
