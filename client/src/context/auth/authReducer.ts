import AuthStateModel from '../../models/AuthStateModel';
import { AuthAction } from '../types';

const authReducer = (
  state: AuthStateModel,
  action: AuthAction
): AuthStateModel => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        loading: false,
        user: { name: '', email: '' },
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        loading: false,
        user: { name: '', email: ''},
        error: ''
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: ''
      };

    default:
      return state;
  }
};

export default authReducer;
