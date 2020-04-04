import React, { useContext, Fragment, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts: React.FC = () => {
  const {
    contacts,
    getContacts,
    loading,
    filtered,
    filterContacts,
    clearFilter
  } = useContext(ContactContext);

  const [filterText, setFilterText] = useState('');
  const items = filterText === '' ? contacts : filtered;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterText !== '') {
      filterContacts(filterText);
    } else if (filtered.length > 0) {
      clearFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, contacts]);

  if (contacts.length === 0 && !loading) {
    return <h2 className="py-2">No contacts yet</h2>;
  }

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Search contact"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilterText(e.target.value)
        }
      />
      {!loading ? (
        <TransitionGroup>
          {items.map(item => (
            <CSSTransition key={item._id} timeout={500} classNames="item">
              <ContactItem contact={item} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
