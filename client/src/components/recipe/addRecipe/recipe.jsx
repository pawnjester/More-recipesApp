import React, { Component } from 'react';
import EditRecipeModal from '../../Modal/EditRecipeModal';


export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onView = this.onView.bind(this);

    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  onDelete() {
    this.props.deleteRecipe(this.props.recipe.id);
  }

  onView() {
    this.props.getRecipe(this.props.recipe.id);
  }

  // onEdit() {
  //   this.props.editRecipe(this.props.recipe.id);
  // }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const style = {
      height: 200,
    };
    return (
      <div className="col-md-4 col-xs-12 " >
        <div className="card">
          <img className="card-img-top" src={this.props.recipe.imageUrl} style={style} />
          <div className="card-body">
            <h4 className="card-title">{this.props.recipe.name}</h4>
            <p className="card-text">{this.props.recipe.ingredients}</p>
            <p className="card-text">{this.props.recipe.method}</p>

          </div>
          <div className="card-body clearfix">
            <div className="text-left text-success float-left">
              <i className="fa fa-pencil" aria-hidden="true" />
              <span id="clickableAwesomeFont" onClick={this.toggle} >&nbsp;Edit</span>
              <EditRecipeModal
                recipe={this.props.recipe}
                isOpen={this.state.modal}
                toggle={this.toggle}
                // editRecipe={this.props.editRecipe}
                id={this.props.recipe.id}
                getAllRecipes={this.props.getAllRecipes}
              />
            </div>

            <div className="text-right text-danger float-right">
              <i className="fa fa-trash" aria-hidden="true" /><span id="clickableAwesomeFont" onClick={() => this.onDelete()} className="delete">&nbsp;Delete</span>
            </div>
            <div className="text-center text-primary float-center">
              <i className="fa fa-eye" aria-hidden="true" /><span id="clickableAwesomeFont" className="view" onClick={() => this.onView()}>&nbsp;View</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

