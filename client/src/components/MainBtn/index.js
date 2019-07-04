import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const MainBtn = ({ text, path }) => {
  return <Button color="success" className="btn" href={path}>{text}</Button>;
};

export default MainBtn;
