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
import About from './pages/About';
import Learn from './pages/Learn';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

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
            <Route exact path='/about' component={About} />
            <Route exact path='/learn' component={Learn} />
            <Route exact path='/results' component={Results} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
