import { Notify } from 'notiflix';
import { useState } from 'react';
import { useSignupMutation } from 'services/authApi';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        return;
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
      const res = await signup({ name, email, password });
      if (res.error) throw Error('Не удалось создать нового пользователя');
      Notify.success('Вы успешно зарегистрированы');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
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
        Register
      </button>
    </form>
  );
};
