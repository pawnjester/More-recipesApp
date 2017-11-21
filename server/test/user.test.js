import expect from 'expect';

import models from './../models';

import app from '../app';

import request from 'supertest';

import { seedUsers } from './seed/seed'

export let token;

describe('More Recipes', () => {
  before(() => models.sequelize.sync({ force: true }));

  describe('Can signup/signin', () => {
    it('shoud get the home page', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
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
      setTimeout(done, 15000);
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userOne)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.user.id).toExist;
          expect(res.body.user.username).toBe('user111');
          expect(res.body.user.email).toBe('user111@example.com');
          expect(res.token).toExist;

          done();
        });
    });

    it('shoud return 409 for creating the user same twice', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userOne)
        .expect(409)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toBe('Username or email is already in use');
          done();
        });
    });

    it('shoud return 406 for incomplete details(username)', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userThree)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toEqual('You need to fill in your username with a minimum length of 6');
          done();
        });
    });

    it('shoud return 406 for no details', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userFour)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toEqual('Please fill in the required details');
          done();
        });
    });

    it('shoud return 406 for incomplete details(email)', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userFive)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toEqual('You need to fill in your email');
          done();
        });
    });

    it('shoud return 406 for wrong email format', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userSix)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toEqual('Invalid email address!');
          done();
        });
    });

    it('shoud return 406 for incomplete details(password)', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userSeven)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.email).toNotExist;
          expect(res.body.error).toEqual('You need to fill in the password');
          done();
        });
    });

    it('shoud sign in a user', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.userOne)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          token = res.body.token;
          console.log(token);
          expect(res.body.userFound.id).toExist;
          expect(res.body.userFound.username).toExist;
          expect(res.body.userFound.email).toExist;
          // expect(res.body.user.message).toEqual('You need to fill in your password');
          expect(token).toExist;
          done();
        });
    });

    it('shoud not sign in a user with incomplete user(username)', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.userEight)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.error).toEqual('Email or username cannot be empty');
          expect(res.token).toNotExist;
          done();
        });
    });

    it('shoud not sign in a user with incomplete user(password)', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.userNine)
        .expect(406)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.error).toEqual('Password field cannot be empty');
          expect(res.token).toNotExist;
          done();
        });
    });

    it('shoud not sign in an unavailable user', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.userTwo)
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.id).toNotExist;
          expect(res.body.username).toNotExist;
          expect(res.body.message).toEqual('User is not registered');
          expect(res.token).toNotExist;
          done();
        });
    });

    it('shoud not return the user password back', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.userOne)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.userFound.id).toExist;
          expect(res.body.userFound.username).toBe('user111');
          expect(res.body.userFound.password).toNotExist;
          expect(res.token).toExist;
          done();
        });
    });
  });
  
 
});
