import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm'; 
import AuthContext from '../../context/auth/authContext';

const Home: React.FC = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm/>
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home;