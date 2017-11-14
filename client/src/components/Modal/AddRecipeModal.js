import React, { Component } from 'react';
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';

class AddRecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',

        }
        
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onNameChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    onSubmit() {
        alert(`Saving ${this.state.name}`)
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
              
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button  styles = "cursor:pointer" onClick= {this.onSubmit}>Add a recipe</Button>
                </Col>
              </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
        )
      }
    }
    

    

export default AddRecipeModal;