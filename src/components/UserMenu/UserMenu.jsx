import { Button, Container, Email } from './UserMenu.styled';
import { useSelector } from 'react-redux';
import { getEmail } from 'redux/auth/authSlice';
import { useLogoutMutation } from 'services/authApi';

export const UserMenu = () => {
  const email = useSelector(getEmail);

  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <Container>
      <Email>{email}</Email>
      <Button type="button" disabled={isLoading} onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};
