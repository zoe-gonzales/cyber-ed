import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import NavBar from '../../components/NavBar';
import MainBtn from '../../components/MainBtn';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import './style.css';

const Home = () => {
  useEffect(() => {
    API.getAllUsers()
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
  });

  const navLinks = [
    {
      path: '/about',
      text: 'About',
    },
    {
      path: '/learn',
      text: 'Learn',
    },
    {
      path: '/login',
      text: 'Log In',
    },
    {
      path: '/signup',
      text: 'Sign Up',
    },
  ];

  return (
    <div>
      <NavBar links={navLinks} />
      <Container>
        <Row>
          <Col md="3" />
          <Col md="6">
            <h2 className="display-2 text-center">Cyber Ed</h2>
            <p className="lead text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="lead text-center">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <br />
              <MainBtn className="btn" text="Take the Quiz" />
            </p>
          </Col>
          <Col md="3" />
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
