import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../utils/history';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/loginPage';
import RecipePage from './recipe/addRecipe/RecipePage';
import Detail from './recipe/Detail';
import NotFound from './NotFound';
import Profile from './user/profile';
import Favorite from './recipe/FavoriteRecipe';
import SearchPage from './SearchPage';
import PasswordReset from './PasswordReset';
import PasswordChangeForm from './PasswordChangeForm';
import RedirectToLogin from './redirectToLogin';
import ChangePasswordForm from './changePasswordForm';
import AllRecipes from './recipe/AllRecipes';

import requireAuth from '../utils/requireAuth';


const Routes = () => (
  <Router history={history}>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/recipes" component={requireAuth(RecipePage)} />
      <Route path="/detail/:recipeId" component={requireAuth(Detail)} />
      <Route path="/favorites" component={requireAuth(Favorite)} />
      <Route path="/profile" component={requireAuth(Profile)} />
      <Route path="/search" component={SearchPage} />
      <Route path="/all-recipes" component={requireAuth(AllRecipes)} />
      <Route path="/reset_password/" component={PasswordReset} />
      <Route path="/auth/reset_password/:token" component={PasswordChangeForm} />
      <Route path="/newLogin" component={RedirectToLogin} />
      <Route path="/change-password" component={ChangePasswordForm} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>

);


export default Routes;
