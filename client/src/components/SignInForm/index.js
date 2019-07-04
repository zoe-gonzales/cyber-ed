import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import useSignInForm from './UseSignIn';
import API from '../../utils/API';

const SignInForm = () => {
  const [redirect, setRedirect] = useState(false);

  const redirectPage = () => {
    setRedirect(true);
  };

  // eslint-disable-next-line consistent-return
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  const { input, handleInputChange, handleSubmit } = useSignInForm(() => {
    const data = {
      username: input.username,
      userPassword: input.userPassword,
    };
    API.logInUser(data)
      .then((res) => {
        if (res.status === 200) {
          redirectPage();
        }
      })
      .catch(error => console.log(error));
  });
  return (
    <div>
      {renderRedirect()}
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