import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRecipe } from '../../../actions/recipeActions';
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from '../../../styles/recipes.scss';
import  Recipe  from './recipe';
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
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
  render() {
    return (
        <div>
        <div className="container text-center  ">
            <div className="heading">
            <h1 className="p-5 ">My Recipes</h1>
            <Button color="primary" className="addrecipebtn btn btn-outline-success " onClick = {this.toggle}> <i className="fa fa-plus"></i>Recipe</Button>
            <AddRecipeModal isOpen={this.state.modal} toggle={this.toggle}/> 
            </div>
            <div className="col-md-4 col-xs-4">
                <Recipe/>
            </div>
            </div>
            </div>
     )
  }
}

  RecipePage.propTypes = {
    createRecipe: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = (state) => {
      return {
          recipes: state.recipes
      }
  }


export default connect (mapStateToProps, { createRecipe })(RecipePage);
