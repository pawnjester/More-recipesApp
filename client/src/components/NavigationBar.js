import React from 'react';
import '../styles/index.scss';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    return ( 
      <nav className="navbar navbar-expand-sm navbar-dark navbar-inverse bg-dark fixed-top ">
        <a className="navbar-brand" href="#" styles ="cursor:pointer">More-Recipes</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link to ="/signin" className="nav-link nov" styles = "border-radius: 4px;">Sign In</Link>
            </li>      
          </ul>    
        </div>  
      </nav>
    )
  }
}

export default NavigationBar

