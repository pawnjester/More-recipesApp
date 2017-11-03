import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from './validations';
import {connect} from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import {Redirect} from  'react-router-dom'



class RecipeForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name:  '',
       recipeImage: '',
       Ingredients: '',
       method: '',
       errors: {},
       redirect: false,
       isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if(!isValid) {
      this.setState({errors}) 
    }

    return isValid;
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      this.setState({errors: {}, isLoading: true});
      this.props.createRecipe(this.state)
      .then(
        (res) => {
        this.setState({redirect : true})},
        (err) => this.setState({ errors: err.response.data, isLoading: false }),
      );
    }    
  }
  
  

  render() {
    const {name, recipeImage, Ingredients, Direction, errors, redirect, method } = this.state;
    if (redirect) {
       return <Redirect to='/'/>;
     }

    return (
    < form onSubmit = {this.onSubmit}>
      {errors.message && <div className ="alert alert-danger">{errors.message}</div>}
      <TextFieldGroup
                    error = {errors.name }
                    onChange = {this.onChange}
                    value = {this.state.name}
                    field = "name"
                    placeholder = "name" 
                    autofocus required
                  />
      
      <TextFieldGroup
                    error = {errors.Ingredients}
                    onChange = {this.onChange}
                    value = {this.state.Ingredients}
                    field = "Ingredients"
                    placeholder = "Ingredients"
                    
                  />
                  <TextFieldGroup
                    error = {errors.method}
                    onChange = {this.onChange}
                    value = {this.state.method}
                    field = "method"
                    placeholder = "Method"
                    
                  />

                  <input
                    error = {errors.recipeImage}
                    onChange = {this.onChange}
                    value = {this.state.recipeImage}
                    field = "recipeImage"
                    placeholder = "recipeImage"
                    type="file"
                    accept="image/*" 
                    style = {{paddingBottom : 20}}                   
                  />
                  <input 
                    disabled = {this.state.isLoading}
                    type="submit"
                    value ="Add Recipe"
                    className="btn btn-outline-danger btn-block text-dark" />
    </form>
    )
  }
}

RecipeForm.propTypes ={
  createRecipe: PropTypes.func.isRequired,
}

export default connect(null, {createRecipe})(RecipeForm)
