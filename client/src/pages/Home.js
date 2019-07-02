import React, { useEffect } from 'react';
import API from '../utils/API';

const Home = () => {
  useEffect(() => {
    API.getAllUsers()
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
  });

  return <div>This is the home page.</div>;
};

export default Home;
