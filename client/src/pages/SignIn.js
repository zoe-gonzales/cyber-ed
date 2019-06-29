import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignIn extends Component {
  state = {
    username: '',
    userPassword: '',
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('Submit button clicked');
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="pass">Password</Label>
          <Input type="password" name="userPassword" id="pass" value={this.state.userPassword} onChange={this.handleInputChange} />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default SignIn;
