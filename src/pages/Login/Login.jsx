import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { useLoginMutation } from 'services/authApi';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        return;
      case 'password':
        setPassword(value);
        return;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await login({ email, password });
      if (res.error) throw Error('Не удалось войти в систему');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  const completed = email && password;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading || !completed}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
