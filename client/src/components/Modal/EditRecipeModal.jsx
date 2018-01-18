import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import toastr from 'toastr';
import imageUpload from '../../helpers/imageUpload';
import editRecipe from '../../actions/editRecipe';
import GetAllRecipes from '../../actions/getRecipe';

/* eslint-disable */
class EditRecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: '',
      method: '',
      imageUrl: '',
      status: '',
      id: this.props.id,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }

  componentWillMount() {
    this.setState({
      name: this.props.Recipe.name,
      ingredients: this.props.Recipe.ingredients,
      method: this.props.Recipe.method,
      imageUrl: this.props.Recipe.imageUrl,
    });
  }

  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  onSubmit(event) {
    event.preventDefault();
    this.props.editRecipe(this.state);
    toastr.success('Recipe successfully changed');
    this.props.GetAllRecipes();
    this.props.toggle();
  }

  Upload(images) {
    this.setState({ status: 'Uploading...'})
    imageUpload(images).then((response) => {
      const { body } = response
      const fileUrl = body.secure_url;

      if(fileUrl) {
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
        <ModalHeader toggle={this.props.toggle} className= 'set-align' >Edit A recipe</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>Name</Label>
              <Col sm={8}>
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
              <Label for="exampleEmail" sm={4}>Ingredients</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="ingredients"
                  id="exampleEmail"
                  value={this.state.ingredients}
                  onChange={this.onNameChange}
                  placeholder="Enter the ingredients"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>method</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="method"
                  id="exampleEmail"
                  value={this.state.method}
                  onChange={this.onNameChange}
                  placeholder="Enter the method"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleFile" sm={4}>File</Label>
              <Col sm={8}>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={this.Upload}
                accept="image/*"
                />
                <h6>{ this.state.status}</h6>
                <FormText color="muted" />
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.onSubmit}>Edit a recipe</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

EditRecipeModal.propTypes = {
  GetAllRecipes: PropTypes.func.isRequired,

};


export default connect(null, { editRecipe,  GetAllRecipes})(EditRecipeModal);
