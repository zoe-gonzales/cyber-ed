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
  getUserByUserName(user) {
    return axios.get(`/api/users/${user}`);
  },
  clearUsers() {
    return axios.delete('/api/users');
  },
  addQuiz(user, data) {
    return axios.post(`/api/quizzes/${user}`, data);
  },
};
