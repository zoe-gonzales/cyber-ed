import { useState } from 'react';

const UseSignIn = (callback) => {
  const [input, setInput] = useState({ username: '', userPassword: '' });

  const handleInputChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setInput(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    callback();
  };

  return {
    handleInputChange,
    handleSubmit,
    input,
  };
};

export default UseSignIn;
