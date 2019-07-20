import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import LinkBtn from '../../components/LinkBtn';
import API from '../../utils/API';
import './style.css';

const Home = () => {
  useEffect(() => {
    API.getAllUsers()
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
  });

  return (
    <div>
      <Container>
        <Row>
          <Col md="3" />
          <Col md="6">
            <h2 className="display-3 text-center">Cyber Ed</h2>
            <p className="lead text-center">
              <LinkBtn className="btn" path="/quiz">Take the Quiz</LinkBtn>
            </p>
          </Col>
          <Col md="3" />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
