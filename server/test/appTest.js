import chai from 'chai';
import chaiHttp from 'chai-http';

import app from  '../app';

const should = chai.should();
chai.use(chaiHttp);

describe("More Recipes", () => {
  it('shoud get the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  });

  it('shoud return a 404 if there is a wrong route', (done) => {
    chai.request(app)
      .get('/6^6fDF')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('ERROR').eql("404: Sorry Page Not Found!");
        
        done()
      })
  });
    
    it('shoud return 201 for creating a recipe', (done) => {
      let recipe = {
            id: 3,
            name: "Cheese cake",
            ingredients: "Sugar, Milk",
            method: "Please stir till it becomes solid",
            upVotes: 6
        }
    chai.request(app)
      .post('/api/recipes')
      .send(recipe)      
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
    });

    it('shoud return 400 for incomplete data', (done) => {
      let recipe = {
            id: 3,
            name: "",
            ingredients: "Sugar, Milk",
            method: "Please stir till it becomes solid",
            upVotes: 6
        }
    chai.request(app)
      .post('/api/recipes')
      .send(recipe)      
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("Put in the name of the recipe");
        done()
      })
    });

    it('shoud modify a recipe', (done) => {
      let recipe = {
            id: 3,
            name: "Cheese cake",
            ingredients: "Sugar, Milk",
            method: "Please stir till it becomes solid",
            upVotes: 6
        }
    chai.request(app)
      .put('/api/recipes/3')
      // .send(recipe)     
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql("Recipe has been modified");        
        done()
      })
    });

    it('shoud delete a recipe', (done) => {      
        chai.request(app)
          .delete('/api/recipes/3')
          // .send(recipe)     
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql("Recipe has been removed");   
            
            done()
          })
    });

    it('shoud return a 404 if no recipe', (done) => {      
        chai.request(app)
          .delete('/api/recipes/15')
          // .send(recipe)     
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql("Recipe not found");            
            done()
          })
    });

    it('shoud get all recipes', (done) => {      
        chai.request(app)
          .get('/api/recipes')
          // .send(recipe)     
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql("Welcome to More-Recipes Application, these are the recipes available");     
            done()
          })
    });

    it('shoud get recipes by id', (done) => {      
        chai.request(app)
          .get('/api/recipes/45')
          // .send(recipe)     
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql("Recipe not found");     
            done()
          })
    });

    it('shoud post reviews', (done) => {      
        chai.request(app)
          .post('/api/recipes/2/reviews')
          // .send(recipe)     
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
    });


        


})

