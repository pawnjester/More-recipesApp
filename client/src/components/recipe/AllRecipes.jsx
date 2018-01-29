import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import NavigationBar from '../NavigationBar';
import Loader from '../common/Loader';
import getAllRecipes from '../../actions/getAllRecipes';
import Footer from '../common/Footer';
import Recipe from './RecipeCard';
/**
 * @description All Recipes component
 *
 * @class AllRecipes
 *
 * @extends {Component}
 */
class AllRecipes extends Component {
  /**
   * @description Creates an instance of AllRecipes.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof AllRecipes
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 * @description get All recipes
 *
 *@method
 *
 * @memberof AllRecipes
 *
 * @returns {void}
 */
  componentWillMount() {
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ loading: false });
      });
  }

  /**
 * @description set state to currentPage
 *
 * @param {any} data
 *
 * @memberof FavoriteRecipe
 *
 * @returns {void}
 */
  onPageChange(data) {
    data.selected += 1;
    this.props.getAllRecipes(data.selected);
  }

  /**
 *
 * @description renders the jsx element
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  render() {
    const recipeList = this.props.allRecipes.recipes || [];
    const pageCount = this.props.allRecipes.Pages;
    return (
      <div>
        <NavigationBar search="true" />
        <div className="container text-center">
          <div className="heading">
            <h1 className="p-5 ">My Recipes</h1>
          </div>
          <hr />
          <div className="row high">
            {recipeList && recipeList.length === 0 &&
              (<h4 className="mt-5 text-center no-recipes"> No recipes yet </h4>)}
            {this.state.loading ?
              <Loader Loading={this.state.loading} /> :
              recipeList &&
              recipeList.map(recipe =>
                (<Recipe
                  recipe={recipe}
                  key={recipe.id}
                />))}
          </div>
        </div>
        {recipeList.length > 0 && <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          previousLabel="Previous"
          nextLabel="Next"
          breakClassName="text-center"
          initialPage={0}
          containerClassName="container pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          previousClassName="page-item"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          onPageChange={this.onPageChange}
        />}

        <Footer />
      </div>
    );
  }
}

AllRecipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  allRecipes: state.recipeReducer.recipes
});

export default connect(mapStateToProps, { getAllRecipes })(AllRecipes);
