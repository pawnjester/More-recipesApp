import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

/* eslint-disable */

class SingleFavorite extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    confirmAlert({
      title: 'Remove this favorite',
      message: 'Are you sure you want to do this?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.deleteFavorite(this.props.favoriteId),
      onCancel: () => toastr.success('Good choice!')
    })
  }

  render() {
    const style = {
      height: 200,
    };
    const { recipe,favoriteId  } = this.props;
    return (
      <div className="col-md-4 col-xs-4 hvr-bob">
        <div className="card">
          <img className="card-img-top" src={recipe.imageUrl} style={style} alt="Chocolate cream" />
          <div className="card-body">
            <h4 className="card-title">{recipe.name}</h4>
          </div>
          <div className="card-body clearfix">
            <div className="text-right text-danger float-right">
              <i className="fa fa-trash" aria-hidden="true" /><span id="clickableAwesomeFont" onClick={() => this.onDelete()} className="delete">&nbsp;Delete</span>
            </div>
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-left text-success float-left">
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
