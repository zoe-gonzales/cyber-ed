import React, { useState, useEffect } from 'react';
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
import ResultsModal from '../../components/Modal';
import ToggleModal from '../../components/Modal/ToggleModal';
import questions from '../../questions.json';
import './style.css';

const Results = () => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const answersString = localStorage.getItem('answers');
    const answersArray = answersString.split(',');
    setAnswers(answersArray);
  }, []);
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
                  {answers[question.id - 1]}
                </CardText>
                <ToggleModal
                  toggle={show => <Button onClick={show} className="more" id={question.id}>More</Button>}
                  content={hide => (
                    <ResultsModal>
                      {question.comment}
                      <br />
                      <Button onClick={hide} style={{ float: 'right' }}>Close</Button>
                    </ResultsModal>
                  )}
                />
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
