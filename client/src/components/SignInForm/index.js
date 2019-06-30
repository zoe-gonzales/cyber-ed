import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import useSignInForm from './UseSignIn';

const SignInForm = () => {
  function onSubmit() {
    alert(`username: ${input.username} \n password: ${input.userPassword}`);
  }

  const { input, handleInputChange, handleSubmit } = useSignInForm(onSubmit);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" value={input.username} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="pass">Password</Label>
          <Input type="password" name="userPassword" id="pass" value={input.userPassword} onChange={handleInputChange} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default SignInForm;
