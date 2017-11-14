[![Build Status](https://travis-ci.org/pawnjester/More-recipesApp.svg?branch=develop)](https://travis-ci.org/pawnjester/More-recipesApp)
[![Coverage Status](https://coveralls.io/repos/github/pawnjester/More-recipesApp/badge.svg?branch=develop)](https://coveralls.io/github/pawnjester/More-recipesApp?branch=develop)

# More-recipesApp
This is a full stack application that enables users share exciting recipes, it also comes with other amazing features.

## Documentation
- SIGN UP A USER : `api/v1/users/signup`
- SIGNIN A USER: `api/v1/users/signin`
- CREATE A RECIPE: `api/v1/recipes`
- GET ALL RECIPE: `api/v1/recipes`
- GET A RECIPE BY ID: `api/v1/recipes/:recipeId`
- MODIFY A RECIPE BY ID: `api/v1/recipes/:recipesId`
- DELETE A RECIPE BY ID: `api/v1/recipes/:recipeId`
- ADD A REVIEW TO A RECIPE: `api/v1/recipes/reviews`
- FAVORITE A RECIPE: `api/v1/recipes/:userId/favorite`
- GET ALL USER FAVORITE: `api/v1/recipes/:userId/favorite`
- UPVOTE A RECIPE: `api/v1/recipes/:recipeId/vote?vote=downvote`
- DOWNVOTE A RECIPE: `api/v1/recipes/:recipeId/vote?vote=downvote`


# App Features
- Sign In and Sign Up
- View User Profile
- Upvote and Downvote Recipes
- Post reviews on recipe

## Dependencies
- Server: Node/Express + Sequelize/Postgres
- Client: The frontd was developed with [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)

# INSTALLATION
- Ensure you have NodeJs and postgres installed
- Clone the repo
- Change your directory `cd MoreRecipesApp`
- Run `npm install` to install dependencies/dev-dependencies
- Create a .env file in the root of the folder to store your environmental variables.
- Setup your db according to the settings in `server/config/config.js`
- run `$ sequelize db:migrate`
- run `npm run start` to start the server

## Testing
#### Server
*  The backend tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`
