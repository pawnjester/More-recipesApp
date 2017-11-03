import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/loginPage';
import RecipePage from './recipe/RecipePage';
import Detail from './recipe/Detail';
import All from './recipe/AllRecipes';


import requireAuth from '../utils/requireAuth'




class Main extends Component {
  render() {
    return (
    <main>
    <Switch>
      <Route exact path ='/' component= {Home} />
      <Route exact path ='/signup' component= {SignUp} /> 
      <Route exact path = '/signin' component ={LoginPage} />
      <Route exact path = '/recipe' component = {requireAuth(RecipePage)} /> 
      <Route exact path = '/detail' component = {Detail} />  
      <Route exact path = '/all' component = {All} />     
         
          
    </Switch>
  </main>
    )
  }
}

export default Main
