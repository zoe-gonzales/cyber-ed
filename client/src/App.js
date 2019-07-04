/* eslint-disable jsx-quotes */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './pages/Home/index';
import Quiz from './pages/Quiz';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInForm} />
            <Route exact path='/signup' component={SignUpForm} />
            <Route exact path='/quiz' component={Quiz} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
