import expect from 'expect';

import models from './../models';

const user = models.User;
const recipe = models.Recipe;


describe('tests for models', () => {
  it('it should create a new User instance', (done) => {
    user.create({
      username: 'Okonji',
      email: 'okonji@example.com',
      password: 'okonjiemmanuel'
    })
      .then((person) => {
        expect(person).toExist;
        expect(person.username).toBe('Okonji');
        expect(person.email).toBe('okonji@example.com');
        done();
      })
      .catch(err => done(err));
  });

  it('it should be a class of the created instance', (done) => {
    user.create({
      username: 'Okonji2',
      email: 'okonji2@example.com',
      password: 'okonjiemmanuel2'
    })
      .then((person) => {
        expect(person).toExist;
        expect(person instanceof user).toBe(true);
        done();
      })
      .catch(err => done(err));
  });

  it('toJSON instance method should not pass along user password', (done) => {
    user.create({
      username: 'okonji6',
      password: 'sokonji789',
      email: 'okonji6@example.com'
    })
      .then((person) => {
        expect(person).toExist;
        expect(person.password).toExist;
        expect(person.toJSON().password).toNotExist;
        done();
      }).catch(err => done(err));
  });

  it('validate Password instance method should be able to detect valid passwords', (done) => {
    user.create({
      username: 'okonji4',
      password: 'okonjifiller',
      email: 'okonji14@example.com'
    })
      .then((person) => {
        expect(person).toExist;
        expect(person.password).toExist;
        expect(person.validPassword('okonjifiller')).toBe(true);
        done();
      }).catch(err => done(err));
  });

  it('validate Password instance method should be able to detect invalid passwords', (done) => {
    user.create({
      username: 'okonji19',
      password: 'okonjifiller',
      email: 'okonji19@example.com'
    })
      .then((person) => {
        expect(person).toExist;
        expect(person.password).toExist;
        expect(person.validPassword('okonjifller')).toBe(false);
        done();
      }).catch(err => done(err));
  });

  it('generateAuthToken instance method should generate a token', (done) => {
    user.create({
      username: 'testUser7',
      password: 'somethingelse',
      email: 'testuser7@example.com'
    })
      .then((person) => {
        const token = person.generateAuthToken();
        expect(token).toExist;
        done();
      }).catch(err => done(err));
  });

  it('it should create a Recipe instance', (done) => {
    recipe.create({
      name: 'Garri stew',
      ingredients: 'yellow garri and fish stew',
      method: 'Stir till it turns black'
    })
      .then((food) => {
        expect(food).toExist;
        expect(food.name).toBe('Garri stew');
        expect(food.ingredients).toBe('yellow garri and fish stew');
        expect(food.method).toBe('Stir till it turns black');
        done();
      }).catch(err => done(err));
  });
});
