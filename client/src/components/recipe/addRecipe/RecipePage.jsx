import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import createRecipe from '../../../actions/recipeActions';
import getRecipes from '../../../actions/getRecipe';
import deleteRecipe from '../../../actions/deleteRecipe';
import getRecipeDetail from '../../../actions/getRecipeDetail';
import editRecipe from '../../../actions/editRecipe';
import NavigationBar from '../../NavigationBar';
import '../../../styles/recipes.scss';
import Recipe from './recipe';
import AddRecipeModal from '../../Modal/AddRecipeModal';


class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      // recipes: this.props.recipes
    };

    this.toggle = this.toggle.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    // this.onViewRecipe = this.onViewRecipe.bind(this);
  }

  componentWillMount() {
    // TODO: get recipes list
    this.props.getRecipes();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     recipes: nextProps.recipes
  //   });
  // }


  onDeleteRecipe(recipeId) {
    this.props.deleteRecipe(recipeId);
  }

  // onViewRecipe(recipeId) {
  //   this.props.getRecipeDetail(recipeId);
  //   this.props.history.push(`/detail/${recipeId}`);
  // }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const fav = (this.props.recipes) ? this.props.recipes : [];
    console.log('>>>', fav);
    return (
      <div>
        <NavigationBar />
        <div className="container text-center  ">
          <div className="heading">
            <h1 className="p-5 ">My Recipes</h1>
            <Button color="primary" className="addrecipebtn btn btn-outline-success " onClick={this.toggle}> <i className="fa fa-plus" />Recipe</Button>
            <AddRecipeModal
              isOpen={this.state.modal}
              toggle={this.toggle}
              createRecipe={this.props.createRecipe}
            />
          </div>
          <hr />
          <div className="row high">
            {this.props.recipes.map(recipe =>
              <Recipe recipe={recipe} key={recipe.id} deleteRecipe={this.onDeleteRecipe} getAllRecipes={this.props.getRecipes} />)}
          </div>
        </div>
      </div>
    );
  }
}


RecipePage.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
});

export default connect(
  mapStateToProps,
  {
    createRecipe, getRecipes, deleteRecipe, getRecipeDetail, editRecipe,
  },
)(RecipePage);
