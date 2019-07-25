import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import './style.css';

const LoggedOut = () => {
  return (
    <Container className="loggedOut-cnt">
      <Row>
        <Col md="3" />
        <Col md="6">
          <p className="lead logged-txt">You have been logged out.</p>
          <Link to="/" className="btn back-home text-center">Home</Link>
        </Col>
        <Col md="3" />
      </Row>
    </Container>
  );
};

export default LoggedOut;
