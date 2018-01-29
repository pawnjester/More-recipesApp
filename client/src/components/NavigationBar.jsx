import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import getUserDetail from '../actions/getUserDetail';
import SearchBar from './searchBar';
/**
 * @description Navigation Bar
 *
 * @class NavigationBar
 *
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {
/**
 * Creates an instance of NavigationBar.
 *
 * @constructor
 *
 * @param {any} props
 *
 * @memberof NavigationBar
 *
 * @returns {void}
 */
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  /**
 *@description get user detail
 *
 * @method
 *
 * @memberof Profile
 *
 * @returns {void}
 */
  componentWillMount() {
    this.props.getUserDetail();
  }

  /**
 *@description logout
 *
 * @param {any} e
 *
 * @memberof NavigationBar
 *
 * @returns {void}
 */
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  /**
   *@description renders the jsx element
   *
   * @memberof NavigationBar
   *
   * @returns {void}
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className="btn-group">
        <button className="btn btn-secondary dropdown-toggle link-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.userDetail.username}
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <button onClick={this.logout} className="nav-link nov bg-light" styles="border-radius: 4px;">Log out</button>
          <Link to="/favorites" className="dropdown-links" >My Favorites</Link><br />
          <Link to="/recipes" className="dropdown-links">My Recipes</Link><br />
          <Link to="/all-recipes" className="dropdown-links" >All Recipes</Link>
        </div>
      </div>
    );

    const guestLinks = (
      <Link to="/signin" className="nav-link nov bg-dark" styles="border-radius: 4px;">Sign In</Link>
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
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
  userDetail: state.userDetailReducer.userDetail,
});

export default connect(mapStateToProps, { logout, getUserDetail })(NavigationBar);
