import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import setAuthorizationToken from './utils/setAuthorizationtoken';
import { setCurrentUser } from './actions/loginActions';
import '../../node_modules/toastr/build/toastr.min.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

