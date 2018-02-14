import chai from 'chai';
import chaiHttp from 'chai-http';
import fakeData from './seed/seed';
import app from '../app';
import db from '../models';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let token;


describe('Test for User', () => {
  before((done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.have.status(201);
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(fakeData.signedInUser2)
          .end((err, res) => {
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
  it('POST /api/v1/users/signup should create a new User', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.signupUser)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('POST /api/v1/users/signup should not create user with details that exists already', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.newUser)
      .end((err, res) => {
        res.should.be.a('object');
        res.body.should.have.property('statusCode').equal(409);
        res.body.should.have.property('error').equal('Username or email is already in use');
        done();
      });
  });
  it('POST /api/v1/users/signup should not create User with invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res.body.should.have.property('error').equal('You need to fill in your email');
        res.should.have.status(406);
        done();
      });
  });
  it('POST /api/v1/users/signup should return an error if the username is less than six characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.shortUsername)
      .end((err, res) => {
        res.body.should.have.property('error').equal('You need to fill in your username with a minimum length of 6');
        res.should.have.status(406);
        done();
      });
  });
  it('POST /api/v1/users/signup should check if email address is supplied', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.noEmailInput)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have
          .property('error')
          .equal('You need to fill in your email');
        done();
      });
  });
  it('POST /api/v1/users/signup should check if email address is valid', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.invalidEmail)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have
          .property('error')
          .equal('Invalid email address!');
        done();
      });
  });
  it('POST /api/v1/users/signup should check if password is supplied', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.noPasswordSignupInput)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have
          .property('error')
          .equal('You need to fill in the password');
        done();
      });
  });
  it('POST /api/v1/users/signup should check if password is supplied', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.spacedPassword)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have
          .property('error')
          .equal('Password cannot contain spaces');
        done();
      });
  });
  it('POST /api/v1/users/signup should check if password is less than 6 characters', (done) => {
    chai.request(app).post('/api/v1/users/signup')
      .send(fakeData.lenPasswordShort)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have
          .property('error')
          .equal('You need to fill in a password with a minimum length of 6');
        done();
      });
  });

  it('POST /api/v1/users/signin should not allow unregistered sign in', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(fakeData.newUser2)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error')
          .equal('Invalid credentials');
        done();
      });
  });

  it('POST /api/v1/users/signin should not sign in without password ', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(fakeData.noPasswordInput)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.have.property('error')
          .equal('Password field cannot be empty');
        done();
      });
  });
  it('POST /api/v1/users/signin should sign in', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(fakeData.signedInUser2)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .equal('Welcome back, tester');
        expect(res.body.userFound.id).to.equal(1);
        expect(res.body.userFound.username).to.equal('tester');
        expect(res.body.userFound.email).to.equal('test@test.com');
        done();
      });
  });
  it('POST /api/v1/users/signin should check that email/username and password match', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(fakeData.signedInUser3)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('error')
          .equal('Invalid credentials');
        done();
      });
  });
  it('POST /api/v1/users/signin should check that correct email/username is supplied', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(fakeData.signedInUser4)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(406);
        res.body.should.have.property('error')
          .equal('Email or username cannot be empty');
        done();
      });
  });

  describe('User Test', () => {
    before((done) => {
      chai.request(app).post('/api/v1/users/signin')
        .send(fakeData.signedInUser2)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('PUT /api/v1/users/update-profile should update profile', (done) => {
      chai.request(app)
        .put('/api/v1/users/update-profile')
        .send(fakeData.updateProfile)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.userFound.username).to.equal('tester');
          expect(res.body.userFound.profileImg).to.equal('https://res.cloudinary.com/donut/image/upload/v1516811745/Photo_on_15-12-2017_at_11.18_alidfo.jpg');
          done();
        });
    });
    it('PUT /api/v1/users/update-profile should not update user profile with taken username', (done) => {
      chai.request(app)
        .put('/api/v1/users/update-profile')
        .send(fakeData.notupdateProfile)
        .set('x-access-token', token)
        .end((err, res)=> {
          res.should.have.status(409);
          expect(res.body.error).to.equal('Username already taken');
          done();
        });
    });

    it('PUT /api/v1/users/update-profile should not allow unauthorized user to view profile', (done) => {
      chai.request(app)
        .put('/api/v1/users/update-profile')
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(401);
          done();
        });
    });
    it('GET /api/v1/users/me should not allow unauthorized user to current user details', (done) => {
      chai.request(app)
        .get('/api/v1/users/me')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(200);
          done();
        });
    });
    it('POST /api/v1/users/verify-user should return 404 if no email found in resetting password', (done) => {
      chai.request(app)
        .post('/api/v1/users/verify-user')
        .send(fakeData.notCheckemail)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.error).to.equal('User not found');
          done();
        });
    });

    it('PUT /api/v1/users/reset-password should return 403 for invalid token in reset password', (done) => {
      chai.request(app)
        .put('/api/v1/users/reset-password')
        .send({ password: 'fodddyyy' })
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body.message).to.equal('You`re unauthorized to perform this action');
          done();
        });
    });
    it('PUT /api/v1/users/change-password should return 400 for invalid password in change password', (done) => {
      chai.request(app)
        .put('/api/v1/users/change-password')
        .send(fakeData.fakePasswordchange)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.equal('Invalid password');
          done();
        });
    });

    it('PUT /api/v1/users/change-password should return an error for same password in change password', (done) => {
      chai.request(app)
        .put('/api/v1/users/change-password')
        .send(fakeData.samePasswordChange)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.equal('New Password is the same as the old password');
          done();
        });
    });

    it('PUT /api/v1/users/change-password should return an error if old password is less than six', (done) => {
      chai.request(app)
        .put('/api/v1/users/change-password')
        .send(fakeData.lenPassword)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(406);
          expect(res.body.error).to.equal('You need to fill in your password, minimum of 6');
          done();
        });
    });
    it('PUT /api/v1/users/change-password should return an error if new password is less than six', (done) => {
      chai.request(app)
        .put('/api/v1/users/change-password')
        .send(fakeData.lennewPassword)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(406);
          expect(res.body.error).to.equal('You need to fill in your password, minimum of 6');
          done();
        });
    });

    it('PUT /api/v1/users/change-password should change password', (done) => {
      chai.request(app)
        .put('/api/v1/users/change-password')
        .send(fakeData.passwordChange)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.message).to.equal('Password changed');
          done();
        });
    });
  });
});
