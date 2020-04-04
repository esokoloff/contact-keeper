import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { ContactType } from '../../utils/ContactUtils';
import ContactContext from '../../context/contact/contactContext';
import ContactModel from '../../models/ContactModel';

const initialState: ContactModel = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  type: ContactType.PERSONAL
};

const ContactForm: React.FC = () => {
  const {
    addContact,
    updateContact,
    clearCurrent,
    current,
    current: { _id: isEditOn }
  } = useContext(ContactContext);

  const [contact, setContact] = useState(initialState);

  useEffect(() => {
    setContact({...contact, ...current});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);


  const { name, email, phone, type } = contact;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditOn) {
      updateContact(contact);
      clearCurrent();
    } else {
      addContact(contact);
    }
    setContact(initialState);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {isEditOn ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="PERSONAL"
        checked={type === ContactType.PERSONAL}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="PROFESSIONAL"
        checked={type === ContactType.PROFESSIONAL}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={isEditOn ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {isEditOn && (
        <div>
          <button
            className="btn btn-light btn-block"
            onClick={() => {
              clearCurrent();
            }}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
