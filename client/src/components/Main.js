import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/loginPage';
import RecipePage from './recipe/addRecipe/RecipePage';
import Detail from './recipe/Detail';
import All from './recipe/AllRecipes';


import requireAuth from '../utils/requireAuth'




class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path ='/' component= {Home} />
        <Route path ='/signup' component= {SignUp} /> 
        <Route path = '/signin' component ={LoginPage} />
        <Route exact path = '/recipe' component ={RecipePage} /> 
        <Route path = '/detail' component = {Detail} /> 
        <Route path = '/all' component = {All} />      
    </Switch>
    )
  }
}

export default Main
