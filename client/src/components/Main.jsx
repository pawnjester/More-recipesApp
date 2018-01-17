import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/LoginPage';
import RecipePage from './recipe/addRecipe/RecipePage';
import Detail from './recipe/Detail';
import NotFound from './NotFound';
import Profile from './user/Profile';
import Favorite from './recipe/FavoriteRecipe';
import SearchPage from './SearchPage';
import PasswordReset from './PasswordReset';
import PasswordChangeForm from './PasswordChangeForm';
import RedirectToLogin from './redirectToLogin';

import requireAuth from '../utils/requireAuth';


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={LoginPage} />
    <Route path="/recipes" component={requireAuth(RecipePage)} />
    <Route path="/detail/:recipeId" component={requireAuth(Detail)} />
    <Route path="/favorites" component={requireAuth(Favorite)} />
    <Route path="/profile" component={requireAuth(Profile)} />
    <Route path="/search" component={requireAuth(SearchPage)} />
    <Route path="/reset_password/" component={PasswordReset} />
    <Route path="/auth/reset_password/:token" component={PasswordChangeForm} />
    <Route path="/newLogin" component={RedirectToLogin} />
    <Route path="*" component={NotFound} />
  </Switch>
);


export default Main;
