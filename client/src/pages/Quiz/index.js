import React from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import ProgressBar from '../../components/ProgressBar';
import Questions from '../../questions.json';
import './style.css';

const QuestionCard = () => {
  return (
    <Row>
      <Col md="2" />
      <Col sm="8">
        <Card body className="card-container">
          <CardTitle>
            <ProgressBar quizProgress={40} />
          </CardTitle>
          <CardText className="lead">
            {Questions[0].question}
          </CardText>
          <Button className="btn">{Questions[0].answers[0]}</Button>
          <Button className="btn">{Questions[0].answers[1]}</Button>
        </Card>
      </Col>
      <Col md="2" />
    </Row>
  );
};

export default QuestionCard;
