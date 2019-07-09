import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import API from '../../utils/API';

const UserPage = ({ match }) => {
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    API.getUserByUserName(match.params.user)
      .then(({ data }) => {
        setUserName(data[0].username);
        setNickName(data[0].nickname);
        setUserId(data[0]._id);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col md="4">
            Hi, {nickName}
        </Col>
        <Col md="4" />
        <Col md="4" />
      </Row>
    </Container>
  );
};

export default UserPage;
