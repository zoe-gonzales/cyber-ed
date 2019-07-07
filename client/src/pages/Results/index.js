import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import questions from '../../questions.json';
import './style.css';

const Results = () => {
  return (
    <Container className="wrapper">
      <Row>
        {questions.map((question) => {
          return (
            <Col md="4" key={question.id}>
              <Card body className="question-body text-center">
                <CardTitle className="h5">{question.question}</CardTitle>
                <CardText className="lead q-text">
                  <span className="answers">Correct answer</span>
                  <br />
                  {question.answers[question.bestAnswer]}
                </CardText>
                <CardText className="lead q-text">
                  <span className="answers">Your answer</span>
                  <br />
                  {question.answers[0]}
                </CardText>
                <Button className="more">More</Button>
              </Card>
            </Col>
          );
        })}
        <Col md="8">
          <Link to="/signup">
            <Button className="action lead">
              Get Personalized Action Plan
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
