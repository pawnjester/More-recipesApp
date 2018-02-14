import faker from 'faker';

const fakeData = {
  newUser: {
    username: 'tester',
    email: 'test@test.com',
    password: 'fodddyyy',
  },
  newUser3: {
    username: 'tester3',
    email: 'test3@test.com',
    password: 'fodddyyy',
  },

  signupUser: {
    username: 'tester2',
    email: 'test2@test.com',
    password: 'fodddyyy',
  },
  shortUsername: {
    username: 'ter2',
    email: 'test2@test.com',
    password: 'fodddyyy',
  },
  invalidEmail: {
    username: 'tesrter2',
    email: 'testk2@',
    password: 'fodddyyy',
  },
  spacedPassword: {
    username: 'tester2',
    email: 'test2@test.com',
    password: 'fodddyyy ',
  },
  newUser2: {
    identifier: faker.name.findName(),
    password: 'fodddyyy',
  },

  signedInUser2: {
    identifier: 'test@test.com' || 'tester',
    password: 'fodddyyy',
  },
  signedInUser3: {
    identifier: 'test3@test.com' || 'tester3',
    password: 'fodddyyy',
  },
  signedInUser5: {
    identifier: 'hamdalah',
    password: 'hamdalah',
  },
  checkEmail: {
    email: 'test@test.com',
  },
  notCheckemail: {
    email: 'test45@test.com'
  },
  passwordChange: {
    oldPassword: 'fodddyyy',
    password: 'andela001'
  },
  fakePasswordchange: {
    oldPassword: 'fodvddyyy',
    password: 'andela001'
  },
  samePasswordChange: {
    oldPassword: 'fodddyyy',
    password: 'fodddyyy'
  },

  signedInUser4: {
    username: 'tester',
    password: 'fodddyyy',
  },

  signedInUser3: {
    identifier: 'test@test.com' || 'tester',
    password: 'fodddyy',
  },

  updateProfile: {
    identifier: 'flavoour',
    profileImg: 'https://res.cloudinary.com/donut/image/upload/v1516811745/Photo_on_15-12-2017_at_11.18_alidfo.jpg'
  },
  notupdateProfile: {
    identifier: 'tester',
    profileImg: 'https://res.cloudinary.com/donut/image/upload/v1516811745/Photo_on_15-12-2017_at_11.18_alidfo.jpg'
  },

  noEmailInput: {
    username: faker.name.findName(),
  },

  noPasswordInput: {
    identifier: faker.name.findName(),
    email: faker.internet.email(),
  },
  noPasswordSignupInput: {
    username: faker.name.findName(),
    email: faker.internet.email(),
  },
  passwordWrong: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fodddyyy',
  },
  lenPasswordShort: {
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: 'food',
  },
  lenPassword: {
    oldPassword: 'mmm'
  },
  lennewPassword: {
    password: '',
  },
  recipe1: {
    name: 'rice',
    ingredients: 'water rice',
    method: 'boil rice',
  },
  recipe2: {
    name: 'beans',
    ingredients: 'water, beans',
    method: 'fry beans'
  },
  fakeRecipe1: {
    name: '',
    ingredients: 'water, beans',
    method: 'fry beans'
  },
  fakeRecipe2: {
    name: 'Bean',
    ingredients: '',
    method: 'fry beans'
  },
  fakeRecipe3: {
    name: 'jojol',
    ingredients: 'water, beans',
    method: ''
  },
  reviews: {
    data: 'Very nice recipe'
  },
  reviews2: {
  },
};

export default fakeData;
