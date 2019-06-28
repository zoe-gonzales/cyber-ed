/* eslint-disable no-unused-expressions */
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

  // Get All Users
  it('should find all users in the database', (done) => {
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

  // Get User By Id
  it('should find user by id', (done) => {
    db.User.create([
      {
        username: 'user',
        password: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      const request = chai.request(server);
      request.get('/api/users').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);

        // eslint-disable-next-line no-underscore-dangle
        const id = responseBody[0]._id;
        chai.request(server)
          .get(`/api/users/${id}`).end((error, response) => {
            const FindById = response.body;
            const FindByIdStatus = response.status;
            // eslint-disable-next-line no-unused-expressions
            expect(error).to.be.null;
            expect(FindByIdStatus).to.equal(200);
            expect(FindById)
              .to.be.an('array');

            expect(FindById[0])
              .to.be.an('object')
              .that.includes({
                username: 'user',
                password: 'pass',
                nickname: 'us',
              });
            done();
          });
      });
    }).catch(error => console.log(error));
  });

  // Add a User
  it('should add a user to the database', (done) => {
    const newUser = {
      username: 'user',
      password: 'pass',
      nickname: 'us',
    };
    const request = chai.request(server);
    request.post('/api/users', newUser).end((err, res) => {
      const responseStatus = res.status;
      // eslint-disable-next-line no-unused-expressions
      expect(err).to.be.null;
      expect(responseStatus).to.equal(200);
      done();
    });
  });

  // Update a User
  it('should find user by id and update', (done) => {
    db.User.create([
      {
        username: 'user',
        password: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      const request = chai.request(server);
      request.get('/api/users').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);

        // eslint-disable-next-line no-underscore-dangle
        const id = responseBody[0]._id;
        const newNickname = {
          username: 'user',
          password: 'pass',
          nickname: 'bob',
        };
        chai.request(server)
          .put(`/api/users/${id}`, newNickname).end((error, response) => {
            const responseUpdate = response.body;
            const responseUpdateStatus = response.status;
            // eslint-disable-next-line no-unused-expressions
            expect(error).to.be.null;
            expect(responseUpdateStatus).to.equal(200);
            expect(responseUpdate[0])
              .to.be.an('object')
              .that.includes({
                nickname: 'bob',
                _id: id,
              });
            done();
          });
      });
    }).catch(error => console.log(error));
  });

  // Delete a User
  it('should remove a user from the database', (done) => {
    db.User.create([
      {
        username: 'user',
        password: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      chai.request(server)
        .get('/api/users').end((err, res) => {
          const responseStatus = res.status;
          const responseBody = res.body;
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.be.null;
          expect(responseStatus).to.equal(200);
          // eslint-disable-next-line no-underscore-dangle
          const id = responseBody[0]._id;
          chai.request(server)
            .delete(`/api/users/${id}`).end((error, response) => {
              const deleteBody = response.body;
              const deleteStatus = response.status;

              expect(error).to.be.null;
              expect(deleteStatus).to.equal(200);
              expect(deleteBody).to.equal({});
              done();
            });
        });
    });
  });
});
