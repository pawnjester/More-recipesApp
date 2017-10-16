import React from 'react';
import '../styles/index.scss';
import NavigationBar from './NavigationBar';
import Main from './Main';

class App extends React.Component {
  render() {
    return (
      <div className= 'container'>
        <NavigationBar />
        <Main />
      </div>
    );
  }
}

export default App;