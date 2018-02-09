import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let token;

describe('Test for Recipes', () => {
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

  it('should create a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', token)
      .send(fakeData.recipe1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.equal('Recipe has been created');
        expect(res.body.recipe.name).to.equal(fakeData.recipe1.name);
        expect(res.body.recipe.ingredients).to.equal(fakeData.recipe1.ingredients);
        done();
      });
  });
  describe('Route', () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send(fakeData.recipe1)
        .end(() => {
          done();
        });
    });
    it('POST /api/v1/recipes should return an error if no name is passed', (done) => {
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
    it('POST /api/v1/recipes should return an error if no ingredients is passed', (done) => {
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
    it('POST /api/v1/recipes should return an error if no method is passed', (done) => {
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
    it('POST /api/v1/recipes should not add the same recipe twice', (done) => {
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
    it('DELETE /api/v1/recipes should delete a recipe', (done) => {
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
    it('DELETE /api/v1/recipes/:recipeId should return 404 when a recipe is not available', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/18')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have.property('error')
            .equal('Recipe not found with id : 18');
          res.should.have.status(404);
          done();
        });
    });
    it('PUT /api/v1/recipes/:recipeId should edit a recipe', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send(fakeData.recipe2)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.recipe.name).to.equal('beans');
          expect(res.body.recipe.ingredients).to.equal('water, beans');
          done();
        });
    });
    it(
      'PUT /api/v1/recipes/:recipeId should check recipe is available for edit',
      (done) => {
        chai.request(app)
          .put('/api/v1/recipes/41')
          .send(fakeData.recipe2)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have.property('error')
              .equal('Recipe not Found with 41');
            res.should.have.status(404);
            done();
          });
      }
    );
    it('GET /api/v1/recipes should get the current users recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/userRecipe?page=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it(
      'GET /api/v1/recipes should return an error when non-number input is passed',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/j')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(422);
            expect(res.body.error).to.equal('Recipe id is not a number');
            done();
          });
      }
    );
    it('GET/api/v1/recipes/:recipeId should get a single recipe detail', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('GET/api/v1/recipes/:recipeId should not return get a single recipe detail', (done) => {
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
    it('GET/api/v1/recipes should get all recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?page=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an('Object');
          done();
        });
    });
    it(
      'GET /api/v1/recipes?sort=upVotes&order=desc should get top upvoted recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes?sort=upVotes&order=desc')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.recipe).to.be.an('Array');
            done();
          });
      }
    );
    it('GET /api/v1/recipes/?search=&limit should search recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/?search=Rice&limit=5')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.searchResults).to.be.an('Array');
          done();
        });
    });
    it(
      'GET /api/v1/recipes/?search=&limit should search unavailable recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/?search=Ritce&limit=5')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
              .equal('Recipe(s) cannot be found');
            done();
          });
      }
    );
    it(
      'GET /api/v1/recipes/most-favorites should list most favorited recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/most-favorites')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.favoriteRecipes).to.be.an('Array');
            done();
          });
      }
    );
  });
});
