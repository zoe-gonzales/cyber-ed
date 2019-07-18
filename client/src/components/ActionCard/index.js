import React from 'react';
import { Button } from 'reactstrap';
import Modal from '../Modal';
import ToggleModal from '../Modal/ToggleModal';
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
          <ToggleModal
            toggle={show => <Button onClick={show} className="learn-more" id={num}>Learn More</Button>}
            content={hide => (
              <Modal>
                {learnMore}
                <br />
                <Button onClick={hide}>Close</Button>
              </Modal>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
