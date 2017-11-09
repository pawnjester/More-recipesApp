import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import { loginModal } from './Modal/loginModal';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {

    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Nav nav>
            <NavItem className="nav-item">
            <Link href = "#" onClick = {this.logout.bind(this)} className="nav-link nov float-right" styles = "border-radius: 4px;">Log out</Link>
            </NavItem>      
          </Nav>
      

    );

    const guestLinks = (
      <Nav nav>
            <NavItem className="nav-item">
            <Link to ="/signin" onClick = {this.toggleNavbar.bind(this)} className="nav-link nov float-right" styles = "cursor:pointer">Sign In</Link>
            </NavItem>      
          </Nav>

    );
    return ( 
      <Navbar className="navbar navbar-expand-sm navbar-dark navbar-inverse bg-dark fixed-top ">
        <Link className="navbar-brand" to ="/" styles ="cursor:pointer; color: #fffc !important">More-Recipes</Link>
        <NavbarToggler  onClick={this.toggleNavbar} className="mr-2 ml-auto" />
        

        <Collapse isOpen={!this.state.collapsed} navbar>
          {isAuthenticated ? userLinks : guestLinks}              
        </Collapse>  
      </Navbar>
    )
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavigationBar)

