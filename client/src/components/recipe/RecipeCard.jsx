import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/**
 *
 * @class RecipeCard
 *
 * @extends {Component}
 */
class RecipeCard extends Component {
  /**
   *@description renders the jsx element
   *
   * @memberof RecipeCard
   *
   * @returns {void}
   */
  render() {
    const style = {
      height: 200,
    };
    const { recipe } = this.props;
    const ellipsis = `${recipe.name.substring(0, 10)}...`;
    return (
      <div className="col-md-4 col-xs-12 hvr-bob" >
        <div className="card">
          <img className="card-img-top" src={recipe.imageUrl} style={style} alt="recipeImage" />
          <div className="card-body">
            <h4 className="card-title">{ellipsis}</h4>
          </div>
          <div className="card-body clearfix">
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true" /><span id="clickableAwesomeFont" className="view" >&nbsp;View</span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
