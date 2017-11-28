import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Main from './Main';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Main />
      </div>
    );
  }
}

export default App;
