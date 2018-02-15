import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import AppComponent from './components/App';
import store from './store/store';
import setAuthorizationToken from './utils/setAuthorizationtoken';
import { setCurrentUser } from './actions/loginActions';
import '../../node_modules/toastr/build/toastr.min.css';

if (localStorage.jwtToken) {
  const decodedToken = jwtDecode(localStorage.jwtToken);
  const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
  if (!hasExpired) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } else {
    setAuthorizationToken(false);
    localStorage.removeItem('jwtToken');
  }
}


render(
  <Provider store={store}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
