import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar title="Contact Keeper" />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route path="/" render={() => <h1>404 Not found</h1>} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
