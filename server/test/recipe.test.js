import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let token;

describe('Recipes', () => {
  beforeEach((done) => {
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
  afterEach(() => db.User.destroy({
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
  describe('Recipe', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('should return an error if no name is passed', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.fakeRecipe1)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('error').to.equal('You need to fill in a name of the recipe');
          done();
        });
    });
    it('should return an error if no ingredients is passed', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.fakeRecipe2)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('error').to.equal('You need to fill in the Ingredients');
          done();
        });
    });
    it('should return an error if no method is passed', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.fakeRecipe3)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.have.property('error').to.equal('You need to fill in the method of preparation');
          done();
        });
    });
    it('should let user add not allow the user add a recipe twice', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('error').to.equal('You cannot create the same recipe twice');
          done();
        });
    });
    it('should let user delete a recipe', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('message')
            .equal('This recipe has been deleted');
          res.should.have.status(200);
          done();
        });
    });
    it('should return 400 when a recipe is not available', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/18')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Recipe not found with id : 18');
          res.should.have.status(400);
          done();
        });
    });
    it('should edit a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send(fakeData.recipe2)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.recipe.name).to.equal('Beans');
          expect(res.body.recipe.ingredients).to.equal('water, beans');
          done();
        });
    });
    it('should check recipe is available for edit', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/41')
        .send(fakeData.recipe2)
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Recipe not Found with 41');
          res.should.have.status(400);
          done();
        });
    });
    it('should get the current users recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/userRecipe?page=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return an error when non-number input is passed', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/j')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(406);
          expect(res.body.error).to.equal('Recipe id is not a number');
          done();
        });
    });
    it('should get a single recipe detail', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return get a single recipe detail', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/16')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error')
            .equal('Recipe with id: 16 does not exist');
          done();
        });
    });
    it('should get all recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?page=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('Object');
          done();
        });
    });
    it('should get top upvoted recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=upVotes&order=desc')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.recipe).to.be.an('Array');
          done();
        });
    });
    it('should search recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/?search=Rice&limit=5')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.searchResults).to.be.an('Array');
          done();
        });
    });
    it('should search unavailable recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/?search=Ritce&limit=5')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message')
            .equal('Recipe(s) cannot be found');
          done();
        });
    });
    it('should list most favorited recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/most-favorites')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.favoriteRecipes).to.be.an('Array');
          done();
        });
    });
  });
});
