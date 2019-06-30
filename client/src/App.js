/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={SignInForm} />
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/home' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
