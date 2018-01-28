import expect from 'expect';
import request from 'supertest';
import models from './../models';
import app from '../app';
import { seedUsers } from './seed/seed';

export let token;
export const token2 = 'kjsdkjdfskjdfsklkjdsjkdskkjl.sdjkdskjksd';

describe('More Recipes', () => {
  before(() => models.sequelize.sync({ force: true }));

  describe('Can signup/signin', () => {
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

    it('should return 422 when user signs up with a password with whiteSpaces', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userTen)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('Password cannot contain spaces');
          done();
        });
    });

    it('should return 422 if a user sign up with a password less than six', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seedUsers.userEleven)
        .expect(422)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('You need to fill in a password with a minimum length of 6');
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
          expect(token).toExist;
          done();
        });
    });

    it('shoud not sign in a user with wrong password', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send(seedUsers.usertwelve)
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.message).toBe('Invalid credentials');
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
          expect(res.body.message).toEqual('Invalid credentials');
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

  describe('Can reset password', () => {
    it('it should return 404 if no email registered', (done) => {
      request(app)
        .post('/api/v1/users/verify-user')
        .send(seedUsers.userSeven)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.error).toBe('User not found');
          done();
        });
    });

    // it('it should send mail if check users', (done) => {
    //   request(app)
    //     .post('/api/v1/users/reset-password')
    //     .send(seedUsers.userOne.email)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       expect
    //     });
    // });
  });
  describe('Profile', () => {
    it('should edit profile details', (done) => {
      request(app)
        .put('/api/v1/users/update-profile')
        .send({
          username: 'charlesss',
          email: 'destiny@gmail.com',
        })
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(201);
          expect(res.body.userFound.username).toBe('charlesss');
          expect(res.body.userFound.email).toBe('destiny@gmail.com');
          done();
        });
    });

    it('should not edit profile details', (done) => {
      request(app)
        .put('/api/v1/users/update-profile')
        .send({
          username: 'charlesssyyyu',
          email: 'destikjjny@gmail.com',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(404);
          done();
        });
    });

    it('should view the user details', (done) => {
      request(app)
        .get('/api/v1/users/me')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(200);
          expect(res.body.username).toBe('charlesss');
          done();
        });
    });

    it('should return 404 if no user profile', (done) => {
      request(app)
        .get('/api/v1/users/me')
        .set('x-access-token', '')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(401);
          done();
        });
    });

    it('should expect 422 when user inputs the old password less than six characters', (done) => {
      request(app)
        .put('/api/v1/users/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: 'use',
          password: 'user111password',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(422);
          expect(res.body.error).toBe('You need to fill in your password, minimum of 6');
        });
      done();
    });

    it('should expect 422 when user inputs the new password less than six characters', (done) => {
      request(app)
        .put('/api/v1/users/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: 'user111password',
          password: 'use',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(422);
          expect(res.body.error).toBe('You need to fill in your password, minimum of 6');
        });
      done();
    });

    it('should expect 201 when user changes password', (done) => {
      request(app)
        .put('/api/v1/users/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: 'user111password',
          password: 'andela011',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(201);
          expect(res.body.message).toBe('Password changed');
        });
      done();
    });


    it('should expect 400 when user inputs the same password with the old one', (done) => {
      request(app)
        .put('/api/v1/users/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: 'user111password',
          password: 'user111password',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(400);
          expect(res.body.error).toBe('New Password is the same as the old password');
        });
      done();
    });

    it('should expect 400 when user changes password', (done) => {
      request(app)
        .put('/api/v1/users/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: 'user19password',
          password: 'andela011',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(400);
          expect(res.body.error).toBe('Invalid password');
        });
      done();
    });


  });
});
