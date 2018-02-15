import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import NavigationBarComponent from '../NavigationBar';
import '../../styles/favorite.scss';
import getFavoriteRecipe from '../../actions/getFavoriteRecipes';
import deleteFavorite from '../../actions/deleteFavorite';
import SingleFavoriteComponent from './SingleFavorite';
import FooterComponent from '../common/Footer';
/**
 *
 * @class FavoriteRecipe
 *
 * @extends {Component}
 */
export class FavoriteRecipe extends Component {
  /**
   * Creates an instance of FavoriteRecipe.
   *
   * @param {any} props
   *
   * @memberof FavoriteRecipe
   */
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 *@description get favorite recipes
 *
 * @memberof FavoriteRecipe
 *
 * @returns {void}
 */
  componentDidMount() {
    this.props.getFavoriteRecipe();
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
    this.props.getFavoriteRecipe(data.selected);
  }
  /**
   *@description delete Favorite
   *
   * @param {any} favoriteId
   *
   * @memberof FavoriteRecipe
   *
   * @returns {void}
   */
  onDelete(favoriteId) {
    this.props.deleteFavorite(favoriteId);
  }
  /**
 *@description renders the jsx element
 *
 * @memberof FavoriteRecipe
 *
 * @returns {void}
 */
  render() {
    const favoriteRecipe = this.props.favoriteRecipe.userFavorite ?
      this.props.favoriteRecipe.userFavorite : [];
    const pageCount = this.props.favoriteRecipe.Pages;
    return (
      <div>
        <NavigationBarComponent search="true" />
        <div className="container text-center  ">
          <div className="heading">
            <h1 className="p-5 ">Favorite Recipes</h1>
          </div>
          <hr />
          <div className="row high">
            {favoriteRecipe.length < 1 &&
              (<h4 className="mt-5 text-center no-favorite">You have no favorite</h4>)}
            {favoriteRecipe.map(favorite =>
              (<SingleFavoriteComponent
                recipe={favorite.Recipe}
                deleteFavorite={this.onDelete}
                favoriteId={favorite.id}
                key={favorite.Recipe.id}
              />))}
          </div>
        </div>
        <ReactPaginate
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
        />
        <FooterComponent />
      </div>
    );
  }
}

FavoriteRecipe.propTypes = {
  getFavoriteRecipe: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favoriteRecipe: state.recipeDetailReducer.favoriteRecipes,
}
);

export default connect(
  mapStateToProps,
  {
    getFavoriteRecipe,
    deleteFavorite,
  },
)(FavoriteRecipe);
