import chai from 'chai';
import chaiHttp from 'chai-http';

import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

chai.should();
chai.use(chaiHttp);

let token;

describe('Reviews', () => {
  before((done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(fakeData.signedInUser2)
          .end((err, res) => {
            token = res.body.token;
            res.body.should.be.a('object');
            done();
          });
      });
  });
  after(() => db.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  }));
  it('should let user add a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', token)
      .send(fakeData.recipe1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  describe('Review', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should let user add a review', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('x-access-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          // res.should.have.status(201);
          res.body.should.have.property('message').equal('Your review has been added');
          done();
        });
    });
    it('should get a single review', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1/reviews')
        .set('x-access-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Reviews found: ');
          res.body.reviews.should.be.an('Array');
          done();
        });
    });
    it('should check if there is a review', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/14/reviews')
        .set('x-access-token', token)
        .send(fakeData.reviews)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').equal('Recipe not found with 14');
          done();
        });
    });
    it('should get delete a review', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1/reviews')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('This review has been deleted');
          done();
        });
    });
    it('should get delete a non existent review', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1/reviews')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').equal('Review not found with id : 1');
          done();
        });
    });
  });
});
