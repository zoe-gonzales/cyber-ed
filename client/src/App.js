/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={SignIn} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
