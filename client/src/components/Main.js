import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signup/signUpPage';


class Main extends React.Component {
  render() {
    return (
    <main>
    <Switch>
      <Route exact path ='/' component= {Home} />
      <Route exact path ='/signup' component= {SignUp} />      
    </Switch>
  </main>
    )
  }
}

export default Main
