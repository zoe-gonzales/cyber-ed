import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import useSignUpForm from './UseSignUp';

const SignUpForm = () => {
  function onSubmit() {
    alert(`username: ${input.username} \n password: ${input.userPassword} \n nickname: ${input.nickName}`);
  }

  const { input, handleInputChange, handleSubmit } = useSignUpForm(onSubmit);

  return (
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
  );
};

export default SignUpForm;
