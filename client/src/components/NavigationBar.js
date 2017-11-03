import React from 'react';
import PropTypes from 'prop-types';
// import '../styles/index.scss';
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux';
import { logout } from '../actions/loginActions';

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {

    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <a href = "#" onClick = {this.logout.bind(this)} className="nav-link nov" styles = "border-radius: 4px;">Log out</a>
            </li>      
          </ul>
      

    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link to ="/signin" className="nav-link nov" styles = "border-radius: 4px;">Sign In</Link>
            </li>      
          </ul>

    );
    return ( 
      <nav className="navbar navbar-expand-sm navbar-dark navbar-inverse bg-dark fixed-top ">
        <Link className="navbar-brand" to ="/" styles ="cursor:pointer">More-Recipes</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? userLinks : guestLinks}              
        </div>  
      </nav>
    )
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavigationBar)

