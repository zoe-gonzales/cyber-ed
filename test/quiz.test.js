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

  it('should find all quizzes in database for a user', (done) =>{
    db.Quiz.create({
      answers: ['a', 'b', 'c', 'd']
    }).then(() => {
      chai.request(server)
        .get('/api/quizzes').end((err, res) => {
          const responseStatus = res.status;
          const responseBody = res.body;

          expect(err).to.be.null;
          expect(responseStatus).to.equal(200);
          expect(responseBody)
            .to.be.an('array')
            .that.has.lengthOf(1);

          expect(responseBody[0])
            .to.be.an('object')
            .that.includes({
              answers: ['a', 'b', 'c', 'd']
            });
          done();
        });
    });
  });
});