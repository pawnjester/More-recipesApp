import React from 'react';
import { Link } from 'react-router-dom';

export const RecipeCard = props => (
  <div className="col-md-4 col-xs-12 hvr-bob" >
    <div className="card">
      <img
        className="card-img-top"
        src={props.recipe.imageUrl}
        style={{ height: 200 }}
        alt="recipeImage"
      />
      <div className="card-body">
        <h4 className="card-title">{`${props.recipe.name.substring(0, 10)}...`}</h4>
      </div>
      <div className="card-body clearfix">
        <Link to={`/detail/${props.recipe.id}`}>
          <div className="text-center text-primary float-center">
            <i className="fa fa-eye" aria-hidden="true" />
            <span id="clickableAwesomeFont" className="view" >
                &nbsp;View
            </span>
          </div>
        </Link>

      </div>
    </div>
  </div>
);

export default RecipeCard;
