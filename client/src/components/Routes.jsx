import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../utils/history';
import HomeComponent from './Homepage';
import LoginPageComponent from './login/LoginPage';
import RecipePageComponent from './recipe/addRecipe/RecipePage';
import DetailComponent from './recipe/Detail';
import NotFound from './NotFound';
import ProfileComponent from './user/profile';
import Favorite from './recipe/FavoriteRecipe';
import SearchPageComponent from './SearchPage';
import PasswordResetComponent from './PasswordReset';
import PasswordChangeFormComponent from './PasswordChangeForm';
import RedirectToLoginComponent from './RedirectToLogin';
import ChangePasswordForm from './ChangePasswordForm';
import AllRecipesComponent from './recipe/AllRecipes';

import requireAuth from '../utils/requireAuth';


const Routes = () => (
  <Router history={history}>

    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/signin" component={LoginPageComponent} />
      <Route path="/recipes" component={requireAuth(RecipePageComponent)} />
      <Route path="/detail/:recipeId" component={requireAuth(DetailComponent)} />
      <Route path="/favorites" component={requireAuth(Favorite)} />
      <Route path="/profile" component={requireAuth(ProfileComponent)} />
      <Route path="/search" component={SearchPageComponent} />
      <Route path="/all-recipes" component={requireAuth(AllRecipesComponent)} />
      <Route path="/reset_password/" component={PasswordResetComponent} />
      <Route
        path="/auth/reset_password/:token"
        component={PasswordChangeFormComponent}
      />
      <Route path="/newLogin" component={RedirectToLoginComponent} />
      <Route
        path="/change-password"
        component={requireAuth(ChangePasswordForm)}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>

);


export default Routes;
