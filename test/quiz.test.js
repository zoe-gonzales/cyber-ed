const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

chai.use(chaiHttp);

describe('Quiz Controller Actions', () => {
  beforeEach(() => {
    chai.request(server);
    return db.Quiz.deleteMany({});
  });

  // Get all Quizzes for a User
  it('should find all quizzes in database for a user', done => {
    db.User
      .create({
      username: 'aaa',
      userPassword: 'bbb',
      nickname: 'ccc',
    })
      .then(db.Quiz.create({ answers: ['a', 'b', 'c'] })
      .then(quizData => {
        return db.User
          .findOneAndUpdate(
            { username: 'aaa' },
            { $push: { quizzes: quizData } },
            { new: true }
          );
      }).then(() => {
        chai
          .request(server)
          .get('/api/quizzes/aaa')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body)
              .to.be.an('array')
              .that.has.lengthOf(1);
            expect(res.body[0])
              .includes({ answers: ['a', 'b', 'c'] });
            done();
        });
    }));
  });
});