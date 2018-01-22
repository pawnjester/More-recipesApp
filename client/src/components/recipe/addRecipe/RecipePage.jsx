import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader';
import CreateRecipe from '../../../actions/recipeActions';
import getRecipes from '../../../actions/getRecipe';
import DeleteRecipe from '../../../actions/deleteRecipe';
import GetRecipeDetail from '../../../actions/getRecipeDetail';
import EditRecipe from '../../../actions/editRecipe';
import NavigationBar from '../../NavigationBar';
import '../../../styles/recipes.scss';
import Recipe from './recipe';
import AddRecipeModal from '../../Modal/AddRecipeModal';
import Footer from '../../common/Footer';
/* eslint-disable */

/**
 *
 *
 * @class RecipePage
 * @extends {Component}
 */
class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      recipes: [],
      loading: true,
      pages: 1,
      errors: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillMount() {
    this.props.getRecipes().then(() => { this.setState({ loading: false }); });
  }

  componentWillReceiveProps(nextProps) {
    console.log('@###$', nextProps);
    this.setState({
      recipes: nextProps.recipes,
      pages: nextProps.pages,
      errors: nextProps.errors
    });
  }


  onDeleteRecipe(recipeId) {
    this.props.DeleteRecipe(recipeId);
  }

  onPageChange(data) {
    data.selected += 1;
    this.props.getRecipes(data.selected);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  render() {
    const { recipes, errors } = this.state;
    const recipeList = recipes ? recipes: [];
    console.log('>>>>log', errors)
    return (
      <div>
        <NavigationBar search="true" />
        <div className="container text-center  ">
          <div className="heading">
            <h1 className="p-5 ">My Recipes</h1>
            <Button color="primary" className="addrecipebtn btn btn-outline-success " onClick={this.toggle}> <i className="fa fa-plus" />Recipe</Button>
            <AddRecipeModal
              isOpen={this.state.modal}
              toggle={this.toggle}
              createRecipe={this.props.CreateRecipe}
              errors={this.state.errors}
            />
          </div>
          <hr />
          <div className="row high">
            {/* {recipeList < 1 && (<h4 className="mt-5 text-center no-recipes"> No recipes yet </h4>)} */}
            {this.state.loading ?
              <Loader Loading={this.state.loading} /> :
              recipeList &&
              recipeList.map(recipe =>
                <Recipe recipe={recipe} key={recipe.id} deleteRecipe={this.onDeleteRecipe} getAllRecipes={this.props.getRecipes} />)}
          </div>
        </div>


        <Footer />
      </div>
    );
  }
}


RecipePage.propTypes = {
  CreateRecipe: PropTypes.func.isRequired,
  DeleteRecipe: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  pages: state.recipeReducer.pages,
  errors: state.recipeReducer.error,
});

export default connect(
  mapStateToProps,
  {
    CreateRecipe, getRecipes, DeleteRecipe, GetRecipeDetail, EditRecipe,
  },
)(RecipePage);
