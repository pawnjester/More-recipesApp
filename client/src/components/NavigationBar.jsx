import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink, Button, Container,
  Modal,
  ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import SearchBar from './searchBar';

const LoginModal = props => (
  <Modal isOpen={props.isOpen} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>Please Sign in</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter an email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter a password" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button styles="cursor:pointer">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </ModalBody>
  </Modal>
);

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      modal: false,
      nestedModal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        <li className="nav-item">
          <button onClick={this.logout} className="nav-link nov bg-dark" styles="border-radius: 4px;">Log out</button>
        </li>
      </div>
    );

    const guestLinks = (
      <li className="nav-item">
        <Link to="/signin" className="nav-link nov bg-dark" styles="border-radius: 4px;">Sign In</Link>
      </li>

    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark navbar-inverse bg-dark fixed-top ">
        <Link className="navbar-brand" to="/" styles="cursor:pointer">More-Recipes</Link>
        {this.props.search && <SearchBar />}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? userLinks : guestLinks}

          </ul>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);

