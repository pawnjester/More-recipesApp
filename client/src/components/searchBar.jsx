import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchRecipe from '../actions/searchRecipe';

class searchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // if (e.target.value) {
    //   this.props.searchRecipe(e.target.value);
    // }
  }

  onFocus() {
    this.context.router.history.push('/search');
  }
  render() {
    return (
      <div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            name="search"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
            value={this.state.search}
            onFocus={this.onFocus}
          />
        </form>
      </div>
    );
  }
}


searchBar.propTypes = {
  searchRecipe: PropTypes.func.isRequired,
};

searchBar.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { searchRecipe })(searchBar);
