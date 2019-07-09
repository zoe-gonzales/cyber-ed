import React, { useState } from 'react';

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setInShown] = useState(false);
  const hide = () => setInShown(false);
  const show = () => setInShown(true);
  return (
    <React.Fragment>
      {toggle(show)}
      {isShown && content(hide)}
    </React.Fragment>
  );
};

export default ToggleContent;
