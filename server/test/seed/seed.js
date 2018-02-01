import jwt from 'jsonwebtoken';

export const generateAuth = (id) => {
  return jwt.sign(
    { id, access: 'auth' },
    process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 }
  ).toString();
};

export const registeredUsers = {
  userOne: {
    id: 1,
    username: 'richard',
    password: 'richardwey',
    email: 'richard@exmaple.com',
    upVotes: 1,
    downVotes: 0
  }
};


export const seedUsers = {

  userOne: {
    username: 'user111',
    password: 'user111password',
    email: 'user111@example.com'
  },
  userTwo: {
    username: 'user112',
    password: 'user112password',
    email: 'user112@example.com'
  },
  userThree: {
    username: '',
    password: 'user113password',
    email: 'user113@example.com'
  },
  userFour: {
    username: '',
    password: '',
    email: ''
  },
  userFive: {
    username: 'user112',
    password: 'user112password',
    email: ''
  },
  userSix: {
    username: 'user112',
    password: 'user112password',
    email: 'user112@example'
  },
  userSeven: {
    username: 'user112',
    password: '',
    email: 'user112@example.com'
  },
  userEight: {
    username: '',
    password: 'user111password',
  },
  userNine: {
    username: 'user111',
    password: '',
  },
  userTen: {
    username: 'ttttttt',
    password: 'jfjj  ff',
    email: 'ttt@example.com',
  },
  userEleven: {
    username: 'tttrfttttt',
    password: 'jff',
    email: 'ttjft@example.com',
  },
  usertwelve: {
    username: 'user111',
    password: 'user115password',
    email: 'user111@example.com'
  },
}

export const seedRecipes = {
  recipeOne: {
    name: 'Rice',
    ingredients: 'Rice flour',
    method: 'Boil the rice',
    upvotes: 100
  },

  recipeTwo: {
    name: 'Boli',
    ingredients: 'Rice maize',
    method: 'Boil the maize',
    upVotes: 100
  },

  recipeThree: {
    name: '',
    ingredients: 'Rice maize',
    method: 'Boil the maize',
    upVotes: 100
  },
  recipeFour: {
    name: 'Boli',
    ingredients: '',
    method: 'Boil the maize',
    upVotes: 100
  },
  recipeFive: {
    name: 'Boli',
    ingredients: 'Rice maize',
    method: '',
    upVotes: 100
  },
  recipeSix: {
    name: '',
    ingredients: '',
    method: '',
  },

  recipeSeven: {
    name: 'Rices',
    ingredients: 'Rice flours',
    method: 'Boil the riced',
    upvotes: 1
  },
};

// export const registeredToken = [
//   generateAuth(registeredUsers.userOne.id),
// ];
