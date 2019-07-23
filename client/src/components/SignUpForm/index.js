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
import { Redirect } from 'react-router-dom';
import useSignUpForm from './UseSignUp';
import API from '../../utils/API';

const SignUpForm = () => {
  const [redirect, setRedirect] = useState(false);
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

  const { input, handleInputChange, handleSubmit } = useSignUpForm(() => {
    const data = {
      username: input.username,
      userPassword: input.userPassword,
      nickname: input.nickName,
    };
    API.signUpUser(data)
      .then((res) => {
        if (res.status === 200) {
          const user = JSON.parse(res.config.data);
          setUserName(user.username);
          let answers = localStorage.getItem('answers');
          if (answers) {
            answers = answers.split(',');
            if (answers.length === 10) {
              API.addQuiz(user.username, answers)
                .then((result) => {
                  console.log(result);
                  redirectPage();
                  localStorage.clear();
                })
                .catch(error => console.log(error));
            }
          } else redirectPage();
        }
      })
      .catch(error => console.log(error));
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
                  <Label for="nickname">Nickname</Label>
                  <Input type="text" name="nickName" id="nickname" value={input.nickName} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="pass">Password</Label>
                  <Input type="password" name="userPassword" id="pass" value={input.userPassword} onChange={handleInputChange} />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
            </CardTitle>
          </Card>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

export default SignUpForm;
