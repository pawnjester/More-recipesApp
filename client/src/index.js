import React from 'react';
import { render } from 'react-dom'
import {BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './styles/index.scss';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import {setCurrentUser} from './actions/loginActions'

const store = createStore(
  rootReducer,
  compose (
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f  
  )
)

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


render(
  <Provider store ={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

