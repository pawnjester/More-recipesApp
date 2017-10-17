import React from 'react';
import { render } from 'react-dom'
import {BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './styles/index.scss';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)


render(
  <Provider store ={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

