import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import sources from '../../sources.json';
import './style.css';

const Learn = () => {
  return (
    <Container>
      <Row>
        <Col md="2" />
        <Col md="8">
          <p className="display-4">
              More Resources
          </p>
          <p className="lead">
            I am not an expert in security, only an enthusiast.
          </p>
          <p className="lead">
            The quiz questions and related suggestions were developing using the following sources.
          </p>
          <p className="lead">
            For the true expert opinion, check out the links below:
          </p>
        </Col>
        <Col md="2" />
      </Row>
      <Row>
        <Col md="2" />
        <Col md="8">
          {sources.map((source) => {
            return (
              <p className="lead" key={source.id}>
                <a className="source" href={source.url}>
                  {source.name}
                </a>
              </p>
            );
          })}
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

export default Learn;
