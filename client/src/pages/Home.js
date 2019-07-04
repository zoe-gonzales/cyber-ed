import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import API from '../utils/API';

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
    </div>
  );
};

export default Home;
