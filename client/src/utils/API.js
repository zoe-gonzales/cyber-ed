const axios = require('axios');

export default {
  logInUser(data) {
    return axios.post('/login', data);
  },
  signUpUser(data) {
    return axios.post('/signup', data);
  },
  getAllUsers() {
    return axios.get('/api/users');
  },
  clearUsers() {
    return axios.delete('/api/users');
  },
};
