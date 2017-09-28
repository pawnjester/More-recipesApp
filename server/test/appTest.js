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


})

