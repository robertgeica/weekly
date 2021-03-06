import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Homepage from './components/layout/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Weeks from './components/weeks/Weeks';
// import Dashboard from './components/dashboard/Dashboard';
import Roadmap from './components/roadmap/Roadmap';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

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
    // console.log('Loading user.');
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Homepage} />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/weeks" component={Weeks} />
          <Route exact path="/roadmap" component={Roadmap} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:token" component={ResetPassword} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
