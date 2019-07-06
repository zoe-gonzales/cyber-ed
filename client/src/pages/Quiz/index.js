/* eslint-disable no-lonely-if */
import React, { useState } from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import Questions from '../../questions.json';
import './style.css';

const QuestionCard = () => {
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const redirectPage = () => {
    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/results" />;
    }
  };

  const quizComplete = (questionsAnswered) => {
    let completed;
    if (questionsAnswered < 10) {
      completed = true;
    } else {
      completed = false;
    }
    return completed;
  };

  const onAnswer = (e) => {
    e.persist();
    const { value } = e.target;
    answers.push(value);
    const completeQs = answers.length;
    if (quizComplete(completeQs)) {
      setAnswers(answers);
      setProgress(progress + 10);
      setCurrentQIndex(currentQIndex + 1);
    } else {
      if (answers.length === 10) redirectPage();
    }
  };

  return (
    <Row>
      {renderRedirect()}
      <Col md="2" />
      <Col md="8">
        <Card body className="card-container">
          <CardTitle>
            <ProgressBar quizProgress={progress} />
          </CardTitle>
          <CardText className="lead">
            {Questions[currentQIndex].question}
          </CardText>
          {Questions[currentQIndex].answers.map((answer) => {
            return <Button key={Math.random() * 10} className="btn" onClick={onAnswer} value={answer}>{answer}</Button>;
          })}
        </Card>
      </Col>
      <Col md="2" />
    </Row>
  );
};

export default QuestionCard;
