import expect from 'expect';
import request from 'supertest';
import reviewMailer from '../helper/reviewMailer';
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
        expect(res.body.message).toBe('Unauthorized user, You need to sign in.');
        done();
      });
  });

  it('it should return a 406 when creating a recipe with no name of the recipe', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeThree)
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You need to fill in a name of the recipe');
        done();
      });
  });

  it('it should return a 406 when creating a recipe with no ingredients', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeFour)
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You need to fill in the Ingredients');
        done();
      });
  });

  it('it should return a 406 when creating a recipe with no method of preparation', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeFive)
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You need to fill in the method of preparation');
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
        expect(res.body.recipe.name).toBe('Rice');
        expect(res.body.recipe.ingredients).toBe('Rice flour');
        expect(res.body.recipe.method).toBe('Boil the rice');
        done();
      });
  });

  it('it should return a 409 when creating a recipe twice', (done) => {
    request(app)
      .post('/api/v1/recipes')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('You cannot create the same recipe twice');
        done();
      });
  });

  it('it should return a 201 when modifying a recipe', (done) => {
    request(app)
      .put('/api/v1/recipes/1')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.recipe.name).toBe('Rice');
        expect(res.body.recipe.ingredients).toBe('Rice flour');
        expect(res.body.recipe.method).toBe('Boil the rice');
        done();
      });
  });

  it('it should return a 400 when modifying a recipe', (done) => {
    request(app)
      .put('/api/v1/recipes/20')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe not Found with 20');
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

  it('it should return 406 for upvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/r/upvote')
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
        expect(res.body.message).toBe('recipe has been upvoted');
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
        expect(res.body.message).toBe('Recipe has been downvoted');
        done();
      });
  });

  it('it should return 406 for downvoting a recipe', (done) => {
    request(app)
      .post('/api/v1/recipes/r/downvote')
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
        expect(res.body.message).toBe('recipe has been downvoted');
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

  it('it should check if a recipe has been favorited', (done) => {
    request(app)
      .get('/api/v1/recipes/checkfavoriteId')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('favorite recipes fetched successfully');
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

  it('it should get most favorites', (done) => {
    request(app)
      .get('/api/v1/recipes/most-favorites')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // expect(Array.isArray(res.body.favoriteRecipes)).toBe(true);
        done();
      });
  });

  it('it should return 404 if a wrong userid is passed in delete favorites', (done) => {
    request(app)
      .delete('/api/v1/recipes/10/favorite')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Favorite not found');
        done();
      });
  });

  it('it should return 404 if a user deletes a favorites', (done) => {
    request(app)
      .delete('/api/v1/recipes/1/favorite')
      .set('x-access-token', token)
      .expect(404)
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
      .send({
        data: 'goatt, this is crazy'
      })
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe id is not a number');
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
        expect(res.body.message).toBe('Reviews found: ');
        done();
      });
  });

  it('it should delete a review that its id is not a number', (done) => {
    request(app)
      .delete('/api/v1/recipes/1h/reviews')
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Review id is not a number');
        done();
      });
  });

  it('it should get a review by id', (done) => {
    request(app)
      .get('/api/v1/recipes/18/reviews')
      .set('x-access-token', token)
      .expect(406)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe not found with 18');
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

  it('it should get a single recipe with non-number id', (done) => {
    request(app)
      .get('/api/v1/recipes/1d')
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

  it('it should get a single recipe', (done) => {
    request(app)
      .get('/api/v1/recipes/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.singleRecipe.name).toBe('Rice');
        done();
      });
  });

  it('it should get a single recipe that does not exist', (done) => {
    request(app)
      .get('/api/v1/recipes/100')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe with id: 100 does not exist');
        done();
      });
  });

  it('it should search the database for recipes', (done) => {
    request(app)
      .get('/api/v1/recipes/?search=Rice&limit=20')
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
        expect(res.body.NumberOfItems).toBe(1);
        expect(res.body.Limit).toBe(6);
        expect(res.body.Pages).toBe(1);
        done();
      });
  });

  it('it should return a 406 when deleting a recipe when non-number id', (done) => {
    request(app)
      .delete('/api/v1/recipes/f')
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

  it('it should return a 200 when deleting a recipe', (done) => {
    request(app)
      .delete('/api/v1/recipes/1')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('This recipe has been deleted');
        done();
      });
  });

  it('it should return a 400 when deleting a recipe that does not exist', (done) => {
    request(app)
      .delete('/api/v1/recipes/29')
      .send(seedRecipes.recipeOne)
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe('Recipe not found with id : 29');
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



  it('it should return a 200 when getting all recipe', (done) => {
    request(app)
      .get('/api/v1/recipes')
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
});
