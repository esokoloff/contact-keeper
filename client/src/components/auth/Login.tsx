import React, { useState, useEffect, useContext } from 'react';
import UserLoginModel from '../../models/UserLoginModel';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const initialLoginForm: UserLoginModel = {
  email: '',
  password: ''
};

const Login: React.FC<{ history: { push: any } }> = props => {
  const { isAuthenticated, loginUser, error, clearErrors } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  const [user, setUser] = useState(initialLoginForm);

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, error]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(user);
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign in"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
