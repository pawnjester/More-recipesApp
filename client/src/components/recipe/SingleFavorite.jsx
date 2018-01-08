import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */

class SingleFavorite extends Component {
  render() {
    const style = {
      height: 200,
    };
    const { recipe } = this.props;
    return (
      <div className="col-md-4 col-xs-4">
        <div className="card">
          <img className="card-img-top" src={recipe.imageUrl} style={style} alt="Chocolate cream" />
          <div className="card-body">
            <h4 className="card-title">{recipe.name}</h4>
            <p className="card-text">{recipe.ingredients}</p>
          </div>
          <div className="card-body clearfix">
            <div className="text-left text-success float-left">
              <i className="fa fa-thumbs-up likes" id="clickableAwesomeFont" aria-hidden="true" /><span id="">&nbsp;{recipe.upVotes}</span>
            </div>
            <div className="text-right text-danger float-right">
              <i className="fa fa-thumbs-up" aria-hidden="true" /><span>&nbsp;{recipe.downVotes}</span>
            </div>
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-center  float-center">
                <i className="fa fa-eye" aria-hidden="true" /><a href="detail.html"><span id="clickableAwesomeFont" className="text-dark">&nbsp;View</span></a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleFavorite;
