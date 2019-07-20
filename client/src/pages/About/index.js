import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import './style.css';

const About = () => {
  return (
    <Container className="about-container">
      <Row>
        <Col md="2" />
        <Col md="8">
          <div className="display-4 item">
            Security is complex.
          </div>
          <div className="lead item">
            This is where I will put info that ppl can read about why i made this app.
          </div>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

export default About;
