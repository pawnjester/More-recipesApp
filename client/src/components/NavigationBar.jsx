import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import getUserDetail from '../actions/getUserDetail';
import SearchBar from './SearchBar';
/**
 * @description Navigation Bar
 *
 * @class NavigationBar
 *
 * @extends {React.Component}
 */
export class NavigationBar extends React.Component {
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
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.getUserDetail();
    }
  }

  /**
 *@description logout
 *
 * @param {any} event
 *
 * @memberof NavigationBar
 *
 * @returns {void}
 */
  logout(event) {
    event.preventDefault();
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
      <div>
        <div className="nav-item dropdown show-large">
          <Link
            className="nav-link dropdown-toggle"
            to="/profile"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.userDetail.username}
          </Link>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
            style={{ top: 52, marginLeft: -45 }}
          >
            <Link
              to="/favorites"
              className="dropdown-item"
              id="favorite-drop"
            >
            My Favorites
            </Link>
            <Link
              to="/recipes"
              className="dropdown-item"
            >
            My Recipes
            </Link>
            <Link
              to="/all-recipes"
              className="dropdown-item"
              id="all-recipes-drop"
            >
            All Recipes
            </Link>
            <Link
              to="/profile"
              className="dropdown-item"
              id="profile-drop"
            >
            My Profile
            </Link>
            <Link
              to="/"
              onClick={this.logout}
              className=" dropdown-item"
              styles="border-radius: 4px;"
              id="log-out-link"
            >Log out
            </Link>
          </div>
        </div>

        <ul className="show-mobile">
          <li><Link
            to="/favorites"
            className="dropdown-item"
          >
          My Favorites
              </Link>
          </li>
          <li><Link
            to="/recipes"
            className="dropdown-item"
          >
          My Recipes
              </Link>
          </li>
          <li><Link
            to="/all-recipes"
            className="dropdown-item"
          >
          All Recipes
              </Link>
          </li>
          <li><Link
            to="/profile"
            className="dropdown-item"
          >
          My Profile
              </Link>
          </li>
          <li><Link
            to="/"
            onClick={this.logout}
            className=" dropdown-item"
            styles="border-radius: 4px;"
          >Log out
              </Link>
          </li>
        </ul>
      </div>

    );

    const guestLinks = (
      <Link
        to="/signin"
        className="nav-link nov bg-dark"
        styles="border-radius: 4px;"
        id="sign-in-link"
      >Sign In
      </Link>
    );
    return (
      <nav
        className="navbar
      navbar-expand-sm
      navbar-dark
      navbar-inverse
      bg-dark fixed-top "
      >
        <Link
          className="navbar-brand"
          to="/"
          styles="cursor:pointer"
        >
        More-Recipes
        </Link>
        {this.props.search && <SearchBar />}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
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
  getUserDetail: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  userDetail: state.userDetailReducer.userDetail,
});

export default connect(mapStateToProps, { logout, getUserDetail })(NavigationBar);
