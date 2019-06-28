/* eslint-disable no-undef */
// eslint-disable-next-line prefer-destructuring

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

chai.use(chaiHttp);

describe('User Controller Actions', () => {
  beforeEach(() => {
    chai.request(server);
    return db.User.deleteMany({});
  });

  it('should find alls users in the database', (done) => {
    db.User.create([
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
      const request = chai.request(server);
      request.get('/api/users').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({
            username: 'user',
            password: 'pass',
            nickname: 'us',
          });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({
            username: 'user-2',
            password: 'pass-2',
            nickname: 'us-2',
          });
        done();
      });
    })
      .catch(error => console.log(error));
  });
});
