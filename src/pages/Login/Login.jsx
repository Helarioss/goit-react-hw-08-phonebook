import { Notify } from 'notiflix';
import { useState } from 'react';
import { useLoginMutation } from 'services/authApi';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  console.log('render login');

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

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={isLoading}>
        Log in
      </button>
    </form>
  );
};
