import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** To Add: Homepage */
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './app.scss';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// Check for existing auth token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
    console.log('Loading user.');
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Navbar} />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
