import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import NavigationBar from '../NavigationBar';
import '../../styles/favorite.scss';
import getFavoriteRecipe from '../../actions/getFavoriteRecipes';
import SingleFavorite from './SingleFavorite';

class FavoriteRecipe extends Component {
  componentWillMount() {
    // TODO: get favorite recipes list
    const userId = jwtDecode(localStorage.jwtToken);
    console.log(userId.id);
    this.props.getFavoriteRecipe(userId.id);
  }
  render() {
    const favoriteRecipe = this.props.favoriteRecipe ? this.props.favoriteRecipe : {};
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
              <SingleFavorite recipe={favorite.Recipe} key={favorite.Recipe.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

FavoriteRecipe.propTypes = {
  getFavoriteRecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  favoriteRecipe: state.recipeDetailReducer.favoriteRecipes,
});

export default connect(
  mapStateToProps,
  {
    getFavoriteRecipe,
  },
)(FavoriteRecipe);
