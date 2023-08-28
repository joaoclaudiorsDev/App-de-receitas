import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmailValid, isPasswordValid } from '../utils/loginValidation';
import { createUser } from '../redux/actions';
import { doneRecipes } from '../tests/mocks/DoneRecipes';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(createUser(email));
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
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
