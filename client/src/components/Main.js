import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './homepage';
import SignUp from './signUp';


class Main extends React.Component {
  render() {
    return (
      <main>
    <Switch>
      <Route exact path ='/' component= {Home} />
    </Switch>
  </main>
    )
  }
}

export default Main
