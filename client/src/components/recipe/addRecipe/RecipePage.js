import React, { Component } from 'react';
import { connect } from 'react-redux';
import createRecipe from '../../../actions/recipeActions';
import getRecipes from '../../../actions/getRecipe';
import deleteRecipe from '../../../actions/deleteRecipe'
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';    
import PropTypes from 'prop-types';
import styles from '../../../styles/recipes.scss';
import Recipe from './recipe';
import NavigationBar from '../../NavigationBar';
import AddRecipeModal from '../../Modal/AddRecipeModal';

class RecipePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modal:false,
      nestedModal:false
    };

    this.toggle = this.toggle.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
  }

  componentWillMount() {
    // TODO: get recipes list
    this.props.getRecipes();
  }
  

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDeleteRecipe(recipeId) {
    this.props.deleteRecipe(recipeId)
  }
      
  render() {
    if (this.props.recipes === undefined) {
      return <h4>Please wait....</h4>
    }
    return (
      <div className="container text-center  ">
        <div className="heading">
          <h1 className="p-5 ">My Recipes</h1>
          <Button color="primary" className="addrecipebtn btn btn-outline-success " onClick = {this.toggle}> <i className="fa fa-plus"></i>Recipe</Button>
          <AddRecipeModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            createRecipe ={this.props.createRecipe}
          /> 
        </div>
        <hr/>
        
        <div className="row high">
            {this.props.recipes.map((recipe) =>
              <Recipe recipe={recipe} key={recipe.id} deleteRecipe={this.onDeleteRecipe}/>
            )}
          </div>
        </div> 
     )
  }
}


RecipePage.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipeReducer.recipes
    }
}


export default connect(mapStateToProps, { createRecipe, getRecipes, deleteRecipe})(RecipePage);
