import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactModel from '../../models/ContactModel';
import { ContactContextProps, ContactType } from '../../utils/ContactUtils';
import ContactFormModel from '../../models/ContactFormModel';
import { ContactAction } from '../types';
import contactReducer from '../contact/contactReducer';
import ContactStateModel from '../../models/ContactStateModel';
import axios from 'axios';

const ContactState = (props: any) => {
  const initialState: ContactStateModel = {
    contacts: [],
    current: { _id: '', name: '', type: ContactType.PERSONAL },
    filtered: [],
    error: '',
    loading: true
  };

  const [state, dispatch] = useReducer<
    React.Reducer<ContactStateModel, ContactAction>
  >(contactReducer, initialState);

  //Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: 'GET_CONTACTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.response.data
      });
    }
  };

  //Add Contact
  const addContact = async (data: ContactFormModel) => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/contacts', data, config);
      dispatch({
        type: 'ADD_CONTACT',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.response.msg
      });
    }
  };

  //Delete Contact
  const deleteContact = async (id: string) => {
    try {
      axios.delete(`/api/contacts/${id}`)

      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      });

    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.response.msg
      });
    }
  };

  const clearContacts = () => {
    dispatch({ 
      type: 'CLEAR_CONTACTS'
    });
  }

  //Set Current contact
  const setCurrent = (contact: ContactModel) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: contact
    });
  };

  //Clear Current contact
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT'
    });
  };

  //Update Contact
  const updateContact = async (contact: ContactModel) => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

      dispatch({
        type: 'UPDATE_CONTACT',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.response.msg
      })
    }
  };

  //Filter Contacts
  const filterContacts = (text: string) => {
    dispatch({
      type: 'FILTER_CONTACTS',
      payload: text
    });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({
      type: 'CLEAR_FILTER'
    });
  };
  

  const contextPropsValues: ContactContextProps = {
    contacts: state.contacts,
    current: state.current,
    filtered: state.filtered,
    error: state.error,
    loading: state.loading,
    addContact,
    updateContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    filterContacts,
    clearFilter,
    getContacts,
    clearContacts
  };

  return (
    <ContactContext.Provider value={contextPropsValues}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
