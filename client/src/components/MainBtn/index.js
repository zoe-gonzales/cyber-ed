import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const MainBtn = ({ text }) => {
  return <Button color="success" className="btn">{text}</Button>;
};

export default MainBtn;
