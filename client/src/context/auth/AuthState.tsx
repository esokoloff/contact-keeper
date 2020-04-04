import React, { useReducer } from 'react';
import AuthStateModel from '../../models/AuthStateModel';
import AuthContext from './authContext';
import authReducer from './authReducer';
import UserRegistrationModel from '../../models/UserRegistrationModel';
import { AuthContextProps } from '../../utils/AuthUtils';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import UserLoginModel from '../../models/UserLoginModel';

const AuthState = (props: any) => {
  const initialState: AuthStateModel = {
    token: localStorage.getItem('token')!,
    isAuthenticated: false,
    user: { name: '', email: ''},
    loading: true,
    error: ''
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      
      const { name, email } = res.data;

      dispatch({ type: 'USER_LOADED', payload: { name, email } });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.response.data.msg });
    }
  };

  // Register user
  const registerUser = async (formData: UserRegistrationModel) => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Login user
  const loginUser = async (formData: UserLoginModel) => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
  }

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const contextPropsValues: AuthContextProps = {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    user: state.user,
    error: state.error,
    registerUser,
    clearErrors,
    loadUser,
    loginUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={contextPropsValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
