import React, { Component } from 'react';
import { connect } from 'react-redux';
import createRecipe from '../../actions/recipeActions'
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';

class AddRecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
          name: '',
          ingredients: '',
          method: ''
        }
        
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onNameChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    onSubmit = (event) => {
        // alert(`Saving ${this.state.name}`)
        event.preventDefault();
        console.log({formdata: this.state});
        this.props.createRecipe(this.state, () => {
          console.log('this fired')
        })
    }
      render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
              <ModalHeader toggle={this.props.toggle}>Add A recipe</ModalHeader>
              <ModalBody>
                <Form>
                <FormGroup row>
                <Label for="exampleEmail" sm={4}>Name</Label>
                <Col sm={8}>
                  <Input 
                  type="text" 
                  name= "name" 
                  id="exampleEmail" 
                  value = {this.state.name}
                  onChange = {this.onNameChange}
                  placeholder="Enter the name" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>Ingredients</Label>
                <Col sm={8}>
                  <Input 
                  type="text" 
                  name= "ingredients" 
                  id="exampleEmail" 
                  value = {this.state.ingredients}
                  onChange = {this.onNameChange}
                  placeholder="Enter the name" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={4}>method</Label>
                <Col sm={8}>
                  <Input 
                  type="text" 
                  name= "method" 
                  id="exampleEmail" 
                  value = {this.state.method}
                  onChange = {this.onNameChange}
                  placeholder="Enter the name" />
                </Col>
              </FormGroup>
              
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button  onClick= {this.onSubmit}>Add a recipe</Button>
                </Col>
              </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
        )
      }
    }
    

    

export default connect(null, { createRecipe })(AddRecipeModal);