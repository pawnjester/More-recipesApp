import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

const should = chai.Should();
chai.use(chaiHttp);

let token;

describe('Vote Testing', () => {
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
            done();
          });
      });
  });
  after(() => db.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  }));
  it('POST /api/v1/recipes should add a recipe', (done) => {
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
  describe('Votes Testing', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('POST /api/v1/recipes/1/upvote should upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('recipe has been upvoted');
          done();
        });
    });
    it('POST /api/v1/recipes/15/upvote should not upvote a non existent recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/15/upvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('You cannot upvote this recipe');
          done();
        });
    });
    it('POST /api/v1/recipes/1/downvote should downvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Recipe has been downvoted');
          done();
        });
    });
    it('POST /api/v1/recipes/1/upvote should upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Recipe has been upvoted');
          done();
        });
    });
    it('POST /api/v1/recipes/1/upvote should remove upvote when upvoted twice', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('upvote removed');
          done();
        });
    });
    it('POST /api/v1/recipes/14/downvote should downvote a non-existent recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/14/downvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('You cannot downvote this recipe');
          done();
        });
    });
    it('POST /api/v1/recipes/1/downvote should remove downvote a recipe when downvoted twice', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('recipe has been downvoted');
          done();
        });
    });
  });
});
