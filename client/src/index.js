import React from 'react';
import { render } from 'react-dom'
import {BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from './actions/loginActions';
import './styles/home.scss';

const store = createStore(
  rootReducer,
  compose (
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f  
  )
)

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


render(
  <Provider store ={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

