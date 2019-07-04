import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import MainBtn from '../../components/MainBtn';
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
            <h2 className="display-2 text-center">Cyber Ed</h2>
            <p className="lead text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="lead text-center">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <br />
              <MainBtn className="btn" text="Take the Quiz" path="/quiz" />
            </p>
          </Col>
          <Col md="3" />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
