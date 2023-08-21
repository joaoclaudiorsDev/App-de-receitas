/*eslint-disable*/

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { isEmailValid, isPasswordValid } from '../utils/loginValidation';
import { createUser } from '../redux/actions';

type StateType = {
  user: {
    email: string;
  };
};

function Login() {
  const dispatch = useDispatch();
  const { email: userEmail } = useSelector((state: StateType) => state.user);
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(email))
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          name="email"
          data-testid="email-input"
          placeholder="Email"
          type="text"
          onChange={ handleChange }
        />

        <input
          name="password"
          data-testid="password-input"
          placeholder="Password"
          type="password"
          onChange={ handleChange }
        />

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isEmailValid(email) || !isPasswordValid(password) }
        >
          Enter
        </button>

      </form>
    </div>
  );
}

export default Login;
