import React from 'react';
import { render } from 'react-dom'
import {BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './styles/index.scss';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer'

const store = createStore(
  rootReducer,
  compose (
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f  
  )
)


render(
  <Provider store ={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

