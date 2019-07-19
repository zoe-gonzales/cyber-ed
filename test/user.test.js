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
        userPassword: 'pass',
        nickname: 'us',
      },
      {
        username: 'user-2',
        userPassword: 'pass-2',
        nickname: 'us-2',
      },
    ]).then(() => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);
        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({
            username: 'user',
            userPassword: 'pass',
            nickname: 'us',
          });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({
            username: 'user-2',
            userPassword: 'pass-2',
            nickname: 'us-2',
          });
        done();
      });
    })
      .catch(error => console.log(error));
  });

  // Get User By Username
  it('should find user by username', (done) => {
    db.User.create([
      {
        username: 'user',
        userPassword: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      let token = '456'
      chai.request(server)
        .get('/api/users')
        .set('Access-Control-Allow-Origin', 'http://localhost:3000')
        .set('Access-Control-Request-Method', 'POST, GET, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        .set('Authorization', 'Bearer ' + token)
        .send({ username: 'user', userPassword: 'pass' })
        .end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);

        const username = responseBody[0].username;
        chai.request(server)
          .get(`/api/users/${username}`).end((error, response) => {
            const FindByUser = response.body;
            const FindByUserStatus = response.status;

            expect(error).to.be.null;
            expect(FindByUserStatus).to.equal(200);
            expect(FindByUser)
              .to.be.an('array');

            expect(FindByUser[0])
              .to.be.an('object')
              .that.includes({
                username: 'user',
                userPassword: 'pass',
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
      userPassword: 'pass',
      nickname: 'us',
    };
    chai.request(server)
      .post('/api/users', newUser)
      .end((err, res) => {
      const responseStatus = res.status;
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
        userPassword: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      const request = chai.request(server);
      request.get('/api/users').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        expect(err).to.be.null;
        expect(responseStatus).to.equal(200);

        // eslint-disable-next-line no-underscore-dangle
        const id = responseBody[0]._id;
        const newNickname = {
          username: 'user',
          userPassword: 'pass',
          nickname: 'bob',
        };
        chai.request(server)
          .put(`/api/users/${id}`, newNickname).end((error, response) => {
            const responseUpdate = response.body;
            const responseUpdateStatus = response.status;

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
