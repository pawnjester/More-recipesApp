import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/loginPage';
import RecipePage from './recipe/addRecipe/RecipePage';
import Detail from './recipe/Detail';
/* eslint-disable */

import requireAuth from '../utils/requireAuth';


class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/recipes" component={RecipePage} />
        <Route path="/detail/:recipeId" component={Detail} />
      </Switch>
    );
  }
}

export default Main;
