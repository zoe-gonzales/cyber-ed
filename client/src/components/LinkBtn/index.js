import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const MainBtn = ({ path, children }) => {
  return <Button color="success" className="btn" href={path}>{children}</Button>;
};

export default MainBtn;
