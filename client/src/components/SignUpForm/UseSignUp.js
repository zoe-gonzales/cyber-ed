import { useState } from 'react';

const UseSignUp = (callback) => {
  const [input, setInput] = useState({ username: '', userPassword: '', nickName: '' });

  const handleInputChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setInput(inputs => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    callback();
    setInput({ username: '', userPassword: '', nickName: '' });
  };

  return {
    handleInputChange,
    handleSubmit,
    input,
  };
};

export default UseSignUp;
