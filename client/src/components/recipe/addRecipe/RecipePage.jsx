import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader';
import CreateRecipe from '../../../actions/recipeActions';
import GetRecipes from '../../../actions/getRecipe';
import DeleteRecipe from '../../../actions/deleteRecipe';
import GetRecipeDetail from '../../../actions/getRecipeDetail';
import EditRecipe from '../../../actions/editRecipe';
import NavigationBar from '../../NavigationBar';
import '../../../styles/recipes.scss';
import Recipe from './Recipe';
import AddRecipeModal from '../../Modal/AddRecipeModal';
import Footer from '../../common/Footer';


class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      recipes: [],
      loading: true,
    };

    this.toggle = this.toggle.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
  }

  componentWillMount() {
    this.props.GetRecipes().then(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes,
    });
  }


  onDeleteRecipe(recipeId) {
    this.props.DeleteRecipe(recipeId);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  render() {
    const { recipes } = this.state;
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
            />
          </div>
          <hr />
          <div className="row high">
            {recipes.length < 1 && (<h4 className="mt-5 text-center no-recipes"> No recipes yet </h4>)}
            {this.state.loading ?
              <Loader Loading={this.state.loading} /> :
              recipes &&
              recipes.map(recipe =>
                <Recipe recipe={recipe} key={recipe.id} deleteRecipe={this.onDeleteRecipe} getAllRecipes={this.props.GetRecipes} />)}
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
  GetRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
});

export default connect(
  mapStateToProps,
  {
    CreateRecipe, GetRecipes, DeleteRecipe, GetRecipeDetail, EditRecipe,
  },
)(RecipePage);
