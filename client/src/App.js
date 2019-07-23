/* eslint-disable jsx-quotes */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoggedInNav from './components/LoggedInNav';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './pages/Home/index';
import Quiz from './pages/Quiz';
import About from './pages/About';
import Learn from './pages/Learn';
import Results from './pages/Results';
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';

const App = () => {
  const [loggedOutNav, setLoggedOutNav] = useState(true);
  const toggleNavType = () => setLoggedOutNav(!loggedOutNav);
  return (
    <Router>
      {loggedOutNav ? <NavBar /> : <LoggedInNav />}
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={SignInForm} />
          <Route exact path='/signup' component={SignUpForm} />
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/about' component={About} />
          <Route exact path='/learn' component={Learn} />
          <Route exact path='/results' component={Results} />
          <Route exact path='/user/:user' component={UserPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
