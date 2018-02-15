import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchRecipe from '../actions/searchRecipe';

/**
 *
 *
 * @class SearchBar
 *
 * @extends {Component}
 */
export class SearchBar extends Component {
  /**
   * @description Creates an instance of searchBar.
   *
   * @param {any} props
   *
   * @memberof searchBar
   */
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
 *
 * @description set state to input value
 *
 * @param {object} e
 *
 * @memberof searchBar
 *
 * @returns {void}
 */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
 * @description redirect to search page
 *
 * @memberof searchBar
 *
 * @returns {void}
 */
  onFocus() {
    this.context.router.history.push('/search');
  }
  /**
 * @description renders jsx element
 *
 * @memberof searchBar
 *
 * @returns {void}
 */
  render() {
    return (
      <div>
        <form className=" my-2 my-lg-0">
          <input
            id="search-bar"
            className=" mr-sm-2 searchbars"
            type="text"
            name="search"
            placeholder="Search recipes...."
            aria-label="Search"
            onChange={this.onChange}
            value={this.state.search}
            onFocus={this.onFocus}
            style={{ width: 320 }}
          />
        </form>
      </div>
    );
  }
};


SearchBar.contextTypes = {
  router: PropTypes.object,
};

export default connect(null, { searchRecipe })(SearchBar);
