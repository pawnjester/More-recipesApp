import React, { Component } from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText
} from 'reactstrap';
import imageUpload from '../../helpers/imageUpload';
import validateInput from '../recipe/validations';

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
      errors: {},
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }


  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.createRecipe(this.state).then((res) => {
        toastr.success('Recipe added');
        this.props.toggle();
      })
    }
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
    const { errors } = this.state;
    console.log('>>>>', errors);
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
                {errors.error || errors.name && <small style={{color: '#A43741' }}>{errors.name}</small>}
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
                {errors.error || errors.ingredients && <small style={{color: '#A43741' }}>{errors.ingredients}</small>}
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
                {errors.error || errors.method && <small style={{color: '#A43741' }}>{errors.method}</small>}
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
