[![Build Status](https://travis-ci.org/pawnjester/More-recipesApp.svg?branch=develop)](https://travis-ci.org/pawnjester/More-recipesApp)
[![Coverage Status](https://coveralls.io/repos/github/pawnjester/More-recipesApp/badge.svg?branch=develop)](https://coveralls.io/github/pawnjester/More-recipesApp?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/bf0624ea738733e9d0a0/maintainability)](https://codeclimate.com/github/pawnjester/More-recipesApp/maintainability)

**More-recipesApp**
This is a full stack application that enables users share exciting recipes, it also comes with other amazing features.
<br />
<br />
<img width="1437" alt="screen shot 2018-01-27 at 12 13 26 pm" src="https://user-images.githubusercontent.com/26750279/35471484-7096d070-035c-11e8-86a6-15bc447fe5e6.png">


View Production App Here:
[https://still-mesa-59950.herokuapp.com/]

### Core Technology Stacks
> - Front-end: React/Redux + Bootstrap
> - Back-end: Expressjs + Sequelize
> - System Dependencies: Node + Postgres

### Folder Structure
> - `client`: contains React/Redux implementation
> - `server`: contains the project API developed in Node/express + Sequelize/postgres

### Getting Started
> **Installation**
> - Clone the repo `https://github.com/pawnjester/More-recipesApp.git`
> - Ensure you have installed [NodeJS](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/download/)
> - Navigate into the app's root directory: `cd folderName`
> - Setup PostgresSql on your local machine
> - Run `$ npm install && bower install` to install all dependencies
> - Install sequelize-cli, Run `$ npm install -g sequelize-cli` (note: sudo install on ubuntu or MAC)
> - Create a .env file in the root directory using the sample .env.sample file
> - setup your db according to settings in `server/onfig/config.json`
> - then run `$ sequelize db:migrate`
> - Run tests to ensure the app is not broken: `npm test:dev`

> **How to Demo/Run the App**
> - To start the App in development: `npm run start:dev`
> - To start the App in a production environment run: `npm run heroku:post-build` then `npm run start`

### Available Functionalities on the Client
>- Signup
>- Signin
>- Create a recipe
>- Favorite a recipe
>- Delete a recipe
>- Edit a recipe
>- View a recipe
>- Upvote a recipe
>- Downvote a recipe
>- Add a review to a recipe
>- Delete a review to a recipe
>- Search for a recipe
>- Edit a user
>- Delete a favorite
>- View most favorited recipes
>- View most upvoted recipes


#### CONTRIBUTING
This project is open for contributions. All contributions must adhere to the Airbnb styleguide.

- [Javascript](http://airbnb.io/javascript/)
- [React](https://github.com/airbnb/javascript/tree/master/react)

**To get started:**
- Raise an Issue [here](https://github.com/pawnjester/More-recipesApp/issues)
- Fork the repository
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Added some features'`
- Push to the branch: `git push origin my-new-feature`
- Submit a PR (pull request) to the [develop branch](https://github.com/pawnjester/More-recipesApp/tree/develop)



#### Author(s)
>- [Okonji Emmanuel](https://github.com/pawnjester)
