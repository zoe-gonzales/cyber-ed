/* eslint-disable jsx-quotes */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import {
  BrowserRouter as
  Router,
  Route,
  Switch,
} from 'react-router-dom';
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
import LoggedOut from './pages/LoggedOut';
import NotFound from './pages/NotFound';
import API from './utils/API';

const App = () => {
  const [loggedOutNav, setLoggedOutNav] = useState(true);
  return (
    <Router>
      {loggedOutNav ? <NavBar /> : <LoggedInNav />}
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={SignInForm} />
          <Route
            exact
            path='/logout'
            render={() => {
              API.logOutUser()
                .then(res => console.log(res))
                .catch(error => console.log(error));
              return <LoggedOut />;
            }}
          />
          <Route exact path='/signup' component={SignUpForm} />
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/about' component={About} />
          <Route exact path='/learn' component={Learn} />
          <Route exact path='/results' component={Results} />
          <Route
            exact
            path='/user/:user'
            render={(props) => {
              setLoggedOutNav(false);
              return <UserPage props={props} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
