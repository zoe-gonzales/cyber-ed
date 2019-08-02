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
  it('should find all users in the database', done => {
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

  // Log In User
  it('should successfully log in user', done => {
    db.User.create([
      {
        username: 'billybob',
        userPassword: 'iambillybob',
        nickname: 'bill',
      },
    ])
    .then(() => {
      chai.request(server)
        .post(`/login`, {
          username: 'billybob',
          userPassword: 'iambillybob',
          nickname: 'bill',
        })
        .end((error, res) => {
            expect(error).to.be.null;
            expect(res.status).to.equal(200);
            done();
          });
      }).catch(error => console.log(error));
    });
    
  // Sign Up User
  it('should successfully sign up user', done => {
    chai.request(server)
      .post('/signup', {
        username: 'user3000',
        userPassword: 'password3000',
        nickname: 'user',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        done();
      });
  });

  // Update a User
  it('should find user by username and update', done => {
    db.User.create([
      {
        username: 'user',
        userPassword: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      const newNickname = {
        username: 'user',
        userPassword: 'pass',
        nickname: 'bob',
      }
      chai.request(server)
          .put(`/api/users/user`, newNickname)
          .end((error, response) => {
            expect(error).to.be.null;
            expect(response.status).to.equal(200);
            done();
          });
      }).catch(error => console.log(error));
  });

  // Delete a User
  it('should remove a user from the database', done => {
    db.User.create([
      {
        username: 'user',
        userPassword: 'pass',
        nickname: 'us',
      },
    ]).then(() => {
      chai.request(server)
          .delete(`/api/users/user`)
          .end((error, response) => {
            expect(error).to.be.null;
            expect(response.status).to.equal(200);
            done();
          });
      });
  });
});

describe('Authentication', () => {
  beforeEach(() => {
    chai.request(server);
    return db.User.deleteMany({});
  });

  it('should hash a plain text password', done => {
    let User = db.User;
    let user = new User();
    user.hashPassword('bestpasswordever', hash => {
      expect(hash).to.not.be.undefined;
      expect(hash).to.be.string;
      expect(hash).to.not.equal('bestpasswordever');
      done();
    });
  });
});