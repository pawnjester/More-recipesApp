import chai from 'chai';
import chaiHttp from 'chai-http';


import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let token;

describe('Favorite', () => {
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
  it('should allow a user create a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', token)
      .send(fakeData.recipe1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.equal('Recipe has been created');
        expect(res.body.recipe.name).to.equal('Rice');
        expect(res.body.recipe.ingredients).to.equal('water rice');
        done();
      });
  });
  describe('Favorite', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should not let user add a non-exitent recipe as favorite', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/15/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('Recipe with id: 15 could not be found');
          done();
        });
    });
    it('should check for an empty favorite list', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('There are no favorite recipes in collection');
          done();
        });
    });
    it('should let user add a recipe as favorite', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equal('recipe favorited');
          done();
        });
    });
    it('should get all favorite', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('the list of favorite recipes');
          done();
        });
    });
    it('should let remove recipe as favorite', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equal('Recipe removed from favorite list');
          done();
        });
    });
    it('return an error if a non-number favoriteId is passed ', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1k/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('error').equal('Favorite id is not a number');
          done();
        });
    });
    it('delete empty favorite list', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1/favorite')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').equal('Favorite not found');
          done();
        });
    });
  });
});
