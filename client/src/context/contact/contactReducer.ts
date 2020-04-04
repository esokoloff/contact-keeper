import { ContactAction } from '../types';
import ContactStateModel from '../../models/ContactStateModel';
import { ContactType } from '../../utils/ContactUtils';

const contactReducer = (
  state: ContactStateModel,
  action: ContactAction
): ContactStateModel => {
  switch (action.type) {
    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case 'CLEAR_CONTACTS':
      return {
        ...state,
        contacts: [],
        filtered: [],
        current: {
          _id: '',
          name: '',
          email: '',
          phone: '',
          type: ContactType.PERSONAL
        },
        error: '',
        loading: true
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: {
          _id: '',
          name: '',
          email: '',
          phone: '',
          type: ContactType.PERSONAL
        }
      };
    case 'FILTER_CONTACTS':
      return {
        ...state,
        filtered: state.contacts.filter(
          contact =>
            contact.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            contact.email?.includes(action.payload.toLowerCase())
        )
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: []
      };
    case 'CONTACT_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contactReducer;
