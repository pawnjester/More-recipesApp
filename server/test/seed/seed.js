import jwt from 'jsonwebtoken';



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
  }
}
