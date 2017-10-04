/* eslint-disable */
import faker from 'faker';
import expect from 'expect'
const request = require('supertest');
import models from './../models';
import {generateToken} from './seed/seed'
const user = models.User;

import app from '../app';

// const should = chai.should();
// chai.use(chaiHttp);
let token;
const fakeUser = {
  username: faker.name.firstName()
}


const beforeany = () => {
  before((done) => {
  user.destroy({ 
    cascade:true,
    truncate:true,
    restartIdentity:true
  });
  done();
  })  
};

// beforeEach((done) => {
//     user.sequelize.sync({force: true});
//     done();
//   });

describe('More Recipes', () => {
  beforeany()
  describe('Can signup/signin', ()=>{
  it('shoud get the home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        expect(res.body.message).toBe('Welcome to More-Recipes');
        // res.should.have.status(200);
        // res.body.should.have.property('message').eql('Welcome to More-Recipes');
        done();
      });
  });

  it('shoud return a 404 if there is a wrong route', (done) => {
    request(app)
      .get('/6^6fDF')
      .expect(404)
      .end((err, res) => {
        // res.should.have.status(404);
        // res.body.should.have.property('ERROR').eql('404: Sorry Page Not Found!');
        done();
      });
  });

  it('shoud return 201 for creating a user', (done) => {
    const user = {
      username: 'fivoetry',
      email: 'fioveyry@gmail.com',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signup')
      .send(user)
      .expect(201)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.user.id).toExist;
        expect(res.body.user.username).toBe('fivoetry');
        expect(res.body.user.email).toBe('fioveyry@gmail.com');
        expect(res.header['x-auth']).toExist;

        done();
      });
  });

  it('shoud return 400 for creating the user same twice', (done) => {
    const user = {
      username: 'fivoetry',
      email: 'fioveyry@gmail.com',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signup')
      .send(user)
      .expect(400)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.email).toNotExist;
        done();
      });
  });

  it('shoud return 400 for incomplete details(password)', (done) => {
    const user = {
      username: '',
      email: 'fioveyry@gmail.com',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signup')
      .send(user)
      .expect(400)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.email).toNotExist;
        expect(res.body.error).toEqual('You need to fill in your username');        
        done();
      });
  });

  it('shoud return 400 for incomplete details(email)', (done) => {
    const user = {
      username: 'fivoetry',
      email: '',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signup')
      .send(user)
      .expect(400)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.email).toNotExist;
        expect(res.body.error).toEqual('You need to fill in your email');        
        done();
      });
  });

  it('shoud return 400 for incomplete details(password)', (done) => {
    const user = {
      username: 'fivoetry',
      email: 'fioveyry@gmail.com',
      password: '',
    };
    request(app)
      .post('/api/recipes/signup')
      .send(user)
      .expect(400)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.email).toNotExist;
        expect(res.body.error).toEqual('You need to fill in your password');        
        done();
      });
  });

  it('shoud sign in a user', (done) => {
    const user = {
      username: 'fivoetry',
      email: 'fioveyry@gmail.com',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signin')
      .send(user)
      .expect(200)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        token = res.header['x-auth'];
        console.log(token)
        expect(res.body.userFound.id).toExist;
        expect(res.body.userFound.username).toExist;
        expect(res.body.userFound.email).toExist;
        // expect(res.body.user.message).toEqual('You need to fill in your password'); 
        expect(res.header['x-auth']).toExist;               
        done();
      });
  });

  it('shoud not sign in a user with incomplete user(username)', (done) => {
    const user = {
      username: '',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signin')
      .send(user)
      .expect(401)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.error).toEqual('Username cannot be empty'); 
        expect(res.header['x-auth']).toNotExist;               
        done();
      });
  });

  it('shoud not sign in a user with incomplete user(password)', (done) => {
    const user = {
      username: 'fivoetry',
      password: '',
    };
    request(app)
      .post('/api/recipes/signin')
      .send(user)
      .expect(401)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.error).toEqual('Password field cannot be empty'); 
        expect(res.header['x-auth']).toNotExist;               
        done();
      });
  });

  it('shoud not sign in an unavailable user', (done) => {
    const user = {
      username: 'fivofetry',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signin')
      .send(user)
      .expect(401)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.id).toNotExist;
        expect(res.body.username).toNotExist;
        expect(res.body.message).toEqual('User is not registered');
        expect(res.header['x-auth']).toNotExist;            
        done();
      });
  });

  it('shoud not return the user password back', (done) => {
    const user = {
      username: 'fivoetry',
      password: '123t45874',
    };
    request(app)
      .post('/api/recipes/signin')
      .send(user)
      .expect(200)
      .end((err, res) => {        
        if(err) {
          return done(err)
        }
        expect(res.body.userFound.id).toExist;
        expect(res.body.userFound.username).toBe('fivoetry');
        expect(res.body.userFound.password).toNotExist;
        expect(res.header['x-auth']).toExist;       
        done();
      });
  });
});
describe('test of authenticated routes', () =>{
  it('it should return a 401 when creating a recipe without authentication', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        name: 'Rice',
        Ingredients: 'Rice flour',
        method: 'Boil the rice',
        upvotes: 100
      })
      .expect(401)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        done()
        
      })
  })

  it('it should return a 201 when creating a recipe', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        name: 'Rice',
        Ingredients: 'Rice flour',
        method: 'Boil the rice',
        upvotes: 100
      })
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        done()
        
      })
  });

  it('it should return a 201 when modifying a recipe', (done) => {
    request(app)
      .put('/api/recipes/1')
      .send({
        name: 'Boli',
        Ingredients: 'Rice maize',
        method: 'Boil the maize',
        upVotes:100
      })
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        done()
      })
  })

  it('it should return a 201 when modifying a recipe', (done) => {
    request(app)
      .delete('/api/recipes/1')
      .send({
        name: 'Boli',
        Ingredients: 'Rice maize',
        method: 'Boil the maize',
        upVotes:100
      })
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        done()
      })
  })

  it('it should return a 201 when modifying a recipe', (done) => {
    request(app)
      .get('/api/recipes')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        done()
      })
  })
})
});
