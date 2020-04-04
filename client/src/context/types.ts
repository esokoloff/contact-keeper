import ContactModel from '../models/ContactModel';
import AlertStateModel from '../models/AlertStateModel';
import LoadedUserModel from '../models/LoadedUserModel';

type Token = {
  token: string;
};

export type ContactAction =
  | { type: 'GET_CONTACTS'; payload: ContactModel[] }
  | { type: 'ADD_CONTACT'; payload: ContactModel }
  | { type: 'UPDATE_CONTACT'; payload: ContactModel }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'SET_CURRENT'; payload: ContactModel }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'FILTER_CONTACTS'; payload: string }
  | { type: 'CLEAR_FILTER' }
  | { type: 'CONTACT_ERROR'; payload: string }
  | { type: 'CLEAR_CONTACTS' };

export type AuthAction =
  | { type: 'REGISTER_SUCCESS'; payload: Token }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'USER_LOADED'; payload: LoadedUserModel }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGIN_SUCCESS'; payload: Token }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' };

export type AlertAction =
  | { type: 'SET_ALERT'; payload: AlertStateModel }
  | { type: 'REMOVE_ALERT'; payload: string };
