import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import useSignInForm from './UseSignIn';
import API from '../../utils/API';
import './style.css';

const SignInForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [invalidCred, setInvalidCred] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [userName, setUserName] = useState('');

  const redirectPage = () => {
    setRedirect(true);
  };

  // eslint-disable-next-line consistent-return
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/user/${userName}`} />;
    }
  };
  const { input, handleInputChange, handleSubmit } = useSignInForm(() => {
    const data = {
      username: input.username,
      userPassword: input.userPassword,
    };
    API.logInUser(data)
      .then((res) => {
        if (res.status === 200 && res.data === 'User does not exist') {
          setNoUser(true);
        } else if (res.status === 200) {
          const userData = JSON.parse(res.config.data);
          const user = userData.username;
          setUserName(user);
          redirectPage();
        }
      })
      .catch((error) => {
        console.log(error);
        setInvalidCred(true);
      });
  });
  return (
    <Container>
      {renderRedirect()}
      <Row>
        <Col md="2" />
        <Col sm="8">
          <Card body className="card-container">
            <CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input type="text" name="username" id="username" value={input.username} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="pass">Password</Label>
                  <Input type="password" name="userPassword" id="pass" value={input.userPassword} onChange={handleInputChange} />
                </FormGroup>
                {invalidCred ? <div>Invalid username or password.</div> : null}
                {noUser ? <div>Username not found.</div> : null}
                <Button type="submit">Submit</Button>
                <Link to="/signup" className="link">Sign Up</Link>
              </Form>
            </CardTitle>
          </Card>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

export default SignInForm;
