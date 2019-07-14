import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const ActionCard = ({
  num,
  suggestion,
  learnMore
}) => {
  return (
    <div className="card action-card">
      <div className="card-body">
        <div className="rec lead">
          <span className="action-count">{num}</span>
          <span className="suggestion">{suggestion}</span>
          <Button className="learn-more" value={learnMore}>learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
