import React from 'react';
import { Route } from 'react-router-dom';

import RegistrationForm from './views/sign-up/components/RegistrationForm';
import LoginForm from './views/sign-in/components/LoginForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Authenticated Dad Jokes</h1>

      <Route exact path="/api/auth/register" render={props => (
        <RegistrationForm {...props} />
      )} />

      <Route exact path="/api/auth/login" render={props => (
        <LoginForm {...props} />
      )} />
    </div>
  );
}

export default App;
