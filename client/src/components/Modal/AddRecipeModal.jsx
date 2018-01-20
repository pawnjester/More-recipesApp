import React, { Component } from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText
} from 'reactstrap';
import imageUpload from '../../helpers/imageUpload';

/* eslint-disable */
class AddRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: '',
      method: '',
      imageUrl: '',
      status: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }


  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state, '+++++');
    this.props.createRecipe(this.state);
    toastr.success('Recipe added');
    this.props.toggle();
  }

  Upload(images) {
    this.setState({ status: 'Uploading...' })
    imageUpload(images).then((response) => {
      const { body } = response
      const fileUrl = body.secure_url;

      if (fileUrl) {
        this.setState({
          imageUrl: fileUrl,
          status: 'Uploaded'
        })
      }
    })
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add A recipe</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Name</Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="name"
                  id="exampleEmail"
                  value={this.state.name}
                  onChange={this.onNameChange}
                  placeholder="Enter the name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Ingredients</Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="ingredients"
                  id="exampleEmail"
                  value={this.state.ingredients}
                  onChange={this.onNameChange}
                  placeholder="Enter the Ingredients"
                  style={{ height: 150}}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>method</Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="method"
                  id="exampleEmail"
                  value={this.state.method}
                  onChange={this.onNameChange}
                  placeholder="Enter the description"
                  style={{ height: 150}}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleFile" sm={3}>File</Label>
              <Col sm={9}>
                <Input
                  type="file"
                  name="file"
                  id="exampleFile"
                  onChange={this.Upload}
                  accept="image/*"
                />
                <h6>{this.state.status}</h6>
                <FormText color="muted" />
              </Col>
            </FormGroup>

            <FormGroup check row >
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.onSubmit} style={{float: 'right', backgroundColor: '#A43741'}}>Add a recipe</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}


export default AddRecipeModal;
