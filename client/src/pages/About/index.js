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
            About
          </div>
          <div className="lead item">
            The idea for this app came about after listening to the  Reply All episode, The Snapchat Thief. After doing additional research, I decided to make a small app designed to provide basic information about current security best practices. I hope you enjoy!
          </div>
          <iframe title="The Snapchat Thief - Reply All" src="https://open.spotify.com/embed-podcast/episode/1oE4laROa7cS6YnRFXYraZ" width="100%" height="232" frameBorder="0" allowTransparency="true" allow="encrypted-media" />
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

export default About;
