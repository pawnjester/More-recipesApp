import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from '../components/common/Footer';
import '../styles/search.scss';
import '../styles/recipes.scss';
import search from '../actions/searchRecipe';
/**
 *
 *
 * @class SearchPage
 *
 * @extends {Component}
 */
export class SearchPage extends Component {
  /**
   * @description Creates an instance of SearchPage.
   *
   * @param {any} props
   *
   * @memberof SearchPage
   */
  constructor(props) {
    super(props);
    this.state = {
      displayError: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
  }

  /**
 *
 *
 * @param {any} event
 *
 * @memberof SearchPage
 *
 * @returns {void}
 */
  onNameChange(event) {
    const exp = /[ ]/;

    if (event.target.value.length > 0) {
      const keyLength = event.target.value.length;
      const charAtLast = event.target.value[keyLength - 1];
      this.setState({ displayError: true });
      if (charAtLast.match(exp)) {
        return false;
      }
      this.props.search(event.target.value);
    } else {
      this.setState({ displayError: false });
    }
  }

  /**
 * @description renders the jsx element
 *
 * @memberof SearchPage
 *
 * @returns {void}
 */
  render() {
    const style = {
      height: 200,
    };
    const recipes = (this.props.recipes) ? (this.props.recipes) : [];
    const recipesList = recipes.map((recipe, index) => (
      <div className="col-md-4 col-xs-12 " key={`${index}`}>
        <div className="card">
          <img
            className="card-img-top"
            src={recipe.imageUrl}
            style={style}
            alt="recipeImage"
          />
          <div className="card-body">
            <h4 className="card-title text-center">
              {`${recipe.name.substring(0, 10)}...`}
            </h4>
          </div>
          <div className="card-body clearfix">
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true" />
                <span id="clickableAwesomeFont" className="view" >
                &nbsp;View
                </span>
              </div>
            </Link>

          </div>
        </div>
      </div>));

    return (
      <div>
        <NavigationBar />
        <div className="container">
          <h1 className="text-center top-margin text-danger">
          Search New Awesome Recipes
          </h1>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 search-input-bar"
              type="text"
              name="search"
              placeholder="Search Recipe name or ingredients"
              aria-label="Search"
              onChange={this.onNameChange}
            />
          </form>
          <br />
          {recipesList.length > 0 && <h4 className="text-center">
          Search results
                                     </h4>}
          {recipes.length < 1 && this.state.displayError &&
          <h4 className="text-center text-danger">
          No result(s) found
          </h4>}
          <br />
          <div className="row high">
            {recipesList}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SearchPage.propTypes = {
  search: PropTypes.func.isRequired
};

const mapStateToProps = ({ recipeReducer }) => ({
  recipes: recipeReducer.searchResults,
  searchErrors: recipeReducer.error
});

export default connect(mapStateToProps, { search })(SearchPage);
