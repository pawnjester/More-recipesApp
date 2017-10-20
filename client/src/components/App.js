import React from 'react';
import '../styles/index.scss';
import NavigationBar from './NavigationBar';
import Main from './Main';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
  render() {
    return (
      <div className= 'container'>
        <NavigationBar />
        <FlashMessagesList />
        <Main />
      </div>
    );
  }
}

export default App;