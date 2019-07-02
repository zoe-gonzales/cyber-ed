/* eslint-disable jsx-quotes */
/* eslint-disable react/prefer-stateless-function */
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
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInForm} />
            <Route exact path='/signup' component={SignUpForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
