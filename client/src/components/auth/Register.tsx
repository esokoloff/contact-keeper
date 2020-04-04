import React, { useState, useContext, useEffect } from 'react';
import UserRegistrationFormModel from '../../models/UserRegistrationFormModel';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext'

const initialRegisterForm: UserRegistrationFormModel = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const Register: React.FC<{history: {push: any}}> = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { registerUser, error, clearErrors, isAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState(initialRegisterForm);
  const { name, email, password, passwordConfirm } = user;

  useEffect(() => {
    if(isAuthenticated) { 
      props.history.push('/');
    }

    if(error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, props.history]);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please, enter all fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert('Password do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password
      })
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign up"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
