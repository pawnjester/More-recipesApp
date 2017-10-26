import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';
import LoginPage from './login/loginPage';
import RecipePage from './recipe/RecipePage';
import requireAuth from '../utils/requireAuth'




class Main extends React.Component {
  render() {
    return (
    <main>
    <Switch>
      <Route exact path ='/' component= {Home} />
      <Route exact path ='/signup' component= {SignUp} /> 
      <Route exact path = '/signin' component ={LoginPage} />
      <Route exact path = '/recipe' component = {requireAuth(RecipePage)} />     
    </Switch>
  </main>
    )
  }
}

export default Main
