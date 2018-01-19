import expect from 'expect';
import request from 'supertest';
import app from '../app';
import { token } from './user.test';
import { seedRecipes } from './seed/seed';


describe('test of authenticated routes (recipes)', () => {
  it('it should return a 401 when creating a recipe without authentication', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeOne)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return a 201 when creating a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return a 201 when modifying a recipe', (done) => {
    request(app)
      .put('/api/v1/recipes/2')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return a 406 when an invalid recipId is inputted', (done) => {
    request(app)
      .put('/api/v1/recipes/f')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe id is not a number');
        done();
      });
  });

  it('it should return 200 for upvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/1/upvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('recipe has been upvoted');
        done();
      });
  });

  it('it should return 422 for upvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/r/upvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe id is not a number');
        done();
      });
  });

  it('it should not allow users upvote a recipe that does not exist', (done) => {
    request(app)
      .post('/api/v1/recipes/788/upvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You cannot upvote this recipe');
        done();
      });
  });

  it('it should return 200 for upvoting a recipe twice', (done) => {
    request(app)
      .post('/api/v1/recipes/1/upvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('upvote removed');
        done();
      });
  });

  it('it should return 200 for downvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/1/downvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('recipe has been downvoted');
        done();
      });
  });

  it('it should return 422 for downvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/r/downvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe id is not a number');
        done();
      });
  });

  it('it should not allow users downvote a recipe that does not exist', (done) => {
    request(app)
      .post('/api/v1/recipes/788/downvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You cannot downvote this recipe');
        done();
      });
  });

  it('it should return 200 for downvoting a recipe twice', (done) => {
    request(app)
      .post('/api/v1/recipes/1/downvote')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('downvote removed');
        done();
      });
  });

  it('it should return 406 for favoriting a recipe with invalid recipe id', (done) => {
    request(app)
      .post('/api/v1/recipes/7f/favorite')
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe id is not a number');
        done();
      });
  });

  it('it should return 404 for favoriting a recipe that is not available', (done) => {
    request(app)
      .post('/api/v1/recipes/7/favorite')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe with id: 7 could not be found');
        done();
      });
  });

  it('it should return 201 for favoriting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/1/favorite')
      .send(seedRecipes.recipeTwo)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('recipe favorited');
        done();
      });
  });

  it('it should return 200 for favoriting a recipe twice', (done) => {
    request(app)
      .post('/api/v1/recipes/1/favorite')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Recipe removed from favorite list');
        done();
      });
  });

  it('it should get all favorites', (done) => {
    request(app)
      .get('/api/v1/recipes/1/favorites')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return 400 if a wrong userid is passed in get all favorites', (done) => {
    request(app)
      .get('/api/v1/recipes/g/favorite')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return 201 for adding a review to a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/1/reviews')
      .send({
        data: 'This is a beautiful soup'
      })
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Your review has been added');
        done();
      });
  });

  it('it should return 406 for adding an empty review to a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/1/reviews')
      .send({
        data: ''
      })
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You need to put a review!');
        done();
      });
  });

  it('it should return 406 for adding a review to a recipeId that is not a number', (done) => {
    request(app)
      .post('/api/v1/recipes/f/reviews')
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You need to put a review!');
        done();
      });
  });

  it('it should return 200 for getting reviews', (done) => {
    request(app)
      .get('/api/v1/recipes/1/reviews')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should delete a review', (done) => {
    request(app)
      .delete('/api/v1/recipes/1/reviews')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('This review has been deleted');
        done();
      });
  });

  it('it should return a 400 when deleting a non-review', (done) => {
    request(app)
      .delete('/api/v1/recipes/177/reviews')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Review not found with id : 177');
        done();
      });
  });

  it('it should get a single recipe', (done) => {
    request(app)
      .get('/api/v1/recipes/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.singleRecipe.name).toBe('Garri stew')
        done();
      });
  });

  it('it should search the database for recipes', (done) => {
    request(app)
      .get('/api/v1/recipes/?search=garri&limit=20')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.statusCode).toBe(200);
        expect(res.body.message).toBe('The results found');
        done();
      });
  });

  it('it should paginate the recipes', (done) => {
    request(app)
      .get('/api/v1/recipes/?page=1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.NumberOfItems).toBe(2);
        expect(res.body.Limit).toBe(6);
        expect(res.body.Pages).toBe(1);
        done();
      });
  });

  it('it should return a 200 when deleting a recipe', (done) => {
    request(app)
      .delete('/api/v1/recipes/2')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it should return 200 when getting a user\'/s recipes is less than one', (done) => {
    request(app)
      .get('/api/v1/recipes/userRecipe')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('There are currently no recipes in collection');
        done();
      });
  });



  it('it should return a 201 when getting all recipe', (done) => {
    request(app)
      .get('/api/v1/recipes')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

});
