import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = ({ quizProgress }) => {
  return (
    <div>
      <Progress color="secondary" value={quizProgress} />
    </div>
  );
};

export default ProgressBar;
