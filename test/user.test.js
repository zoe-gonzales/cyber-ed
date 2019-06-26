/* eslint-disable no-undef */
// eslint-disable-next-line prefer-destructuring

const { expect, chai } = require('chai');
const server = require('../server');
const db = require('../models');

// describe('Basic Mocha String Test', () => {
//   it('should return number of charachters in a string', () => {
//     assert.equal('Hello'.length, 5);
//   });
//   it('should return first charachter of the string', () => {
//     assert.equal('Hello'.charAt(0), 'H');
//   });
//   it('should return sum value', () => {
//     assert.equal(2 + 2, 4);
//   });
//   it('should have a type of string', () => {
//     assert.typeOf(4, 'string');
//   });
// });

describe('User Controller Actions', () => {
  beforeEach(() => {
    request = chai.request(server);
    return db.User.remove({});
  });

  it('should find alls users in the database', (done) => {
    db.User.bulkCreate([
      {
        username: 'user',
        password: 'pass',
        nickname: 'us',
      },
      {
        username: 'user-2',
        password: 'pass-2',
        nickname: 'us-2',
      },
    ]).then(() => {
      request.get('/api/users').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody).to.be.an('array');
      });
      done();
    });
  });
});
