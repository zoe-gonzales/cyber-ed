const axios = require('axios');

export default {
  logInUser(data) {
    return axios.post('/login', data, { withCredentials: true });
  },
  logOutUser() {
    return axios.get('/logout', { withCredentials: true });
  },
  signUpUser(data) {
    return axios.post('/signup', data);
  },
  getAllUsers() {
    return axios.get('/api/users', { withCredentials: true });
  },
  getUser(user) {
    return axios.get(`/api/users/${user}`, { withCredentials: true });
  },
  clearUsers() {
    return axios.delete('/api/users', { withCredentials: true });
  },
  addQuiz(user, data) {
    return axios.post(`/api/quizzes/${user}`, data);
  },
};
