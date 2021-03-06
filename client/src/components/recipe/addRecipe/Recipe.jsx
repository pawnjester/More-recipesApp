import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import { confirmAlert } from 'react-confirm-alert';
import EditRecipeModal from '../../Modal/EditRecipeModal';
/**
 *
 * @class Recipe
 *
 * @extends {Component}
 */
export class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      showDialog: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  onDelete = () => {
    confirmAlert({
      title: 'Delete this recipe',
      message: 'Are you sure you want to do this?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.deleteRecipe(this.props.recipe.id),
      onCancel: () => toastr.success('Good choice!')
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

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
            <div className="text-left text-success float-left">
              <i className="fa fa-pencil edit" aria-hidden="true" />
              <span id="clickableAwesomeFont" onClick={this.toggle} className="edit-recipe-link">&nbsp;Edit</span>
              <EditRecipeModal
                Recipe={recipe}
                isOpen={this.state.modal}
                toggle={this.toggle}
                id={this.props.recipe.id}
                getAllRecipes={this.props.GetAllRecipes}
              />
            </div>

            <div className="text-right container-delete text-danger float-right">
              <i className="fa fa-trash delete-btn"
                aria-hidden="true" />
              <span id="clickableAwesomeFont"
                onClick={() => this.onDelete()}
                className="delete">&nbsp;Delete
              </span>
            </div>
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true" />
                <span id="clickableAwesomeFont" className="view" >
                  &nbsp;View</span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
