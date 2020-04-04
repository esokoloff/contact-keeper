import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

interface NavbarPropList {
  title: string;
  icon?: string;
}

const Navbar: React.FC<NavbarPropList> = ({
  title,
  icon = 'fas fa-id-card-alt'
}) => {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);

  const onLogout = () => {
    logoutUser();
    clearContacts();
  }

  const authLinks = (
    <Fragment>
      <li>Hello, {user.name}</li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm" onClick={onLogout}>
            Logout
          </span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
