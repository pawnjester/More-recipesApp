import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import JwtDecode from 'jwt-decode';
import NavigationBar from '../NavigationBar';
import '../../styles/favorite.scss';
import GetFavoriteRecipe from '../../actions/getFavoriteRecipes';
import DeleteFavorite from '../../actions/deleteFavorite';
import SingleFavorite from './SingleFavorite';
import Footer from '../common/Footer';
/**
 *
 *
 * @class FavoriteRecipe
 * @extends {Component}
 */
class FavoriteRecipe extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }
/**
 *
 *
 * @memberof FavoriteRecipe
 */
  componentWillMount() {
    const userId = JwtDecode(localStorage.jwtToken);
    this.props.GetFavoriteRecipe(userId.id);
  }

  onDelete(favoriteId) {
    this.props.DeleteFavorite(favoriteId);
  }
  /**
 *
 *
 * @returns
 * @memberof FavoriteRecipe
 */
  render() {
    const favoriteRecipe = this.props.favoriteRecipe ? this.props.favoriteRecipe : [];

    return (
      <div>
        <NavigationBar />
        <div className="container text-center  ">
          <div className="heading">
            <h1 className="p-5 ">Favorite Recipes</h1>
          </div>
          <hr />
          <div className="row high">
            {favoriteRecipe.map(favorite =>
              <SingleFavorite recipe={favorite.Recipe} deleteFavorite={this.onDelete} favoriteId={favorite.id} key={favorite.Recipe.id} />)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

FavoriteRecipe.propTypes = {
  GetFavoriteRecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  favoriteRecipe: state.recipeDetailReducer.favoriteRecipes,
});

export default connect(
  mapStateToProps,
  {
    GetFavoriteRecipe,
    DeleteFavorite
  },
)(FavoriteRecipe);
