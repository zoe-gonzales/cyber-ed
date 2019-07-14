import React from 'react';
import ActionCard from '../ActionCard';
import suggestions from '../../suggestions.json';

const ActionPlan = () => {
  return (
    <div>
      {suggestions.map((suggestion) => {
        return (
          <ActionCard
            num={suggestion.num}
            suggestion={suggestion.suggestion}
            learnMore={suggestion.learnMore}
          />
        );
      })}
    </div>
  );
};

export default ActionPlan;
