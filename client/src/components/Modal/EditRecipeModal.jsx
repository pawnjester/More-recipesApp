import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import toastr from 'toastr';
import imageUpload from '../../helpers/imageUpload';
import editRecipe from '../../actions/editRecipe';
import GetAllRecipes from '../../actions/getRecipe';
/**
 *
 * @class EditRecipeModal
 *
 * @extends {Component}
 */
class EditRecipeModal extends Component {
  /**
   * Creates an instance of EditRecipeModal.
   *
   * @param {any} props
   *
   * @memberof EditRecipeModal
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: '',
      method: '',
      imageUrl: '',
      status: '',
      id: this.props.id,
      disabled: false
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }
  /**
 * @description set state
 *
 * @memberof EditRecipeModal
 *
 * @returns {void}
 */
  componentWillMount() {
    this.setState({
      name: this.props.Recipe.name,
      ingredients: this.props.Recipe.ingredients,
      method: this.props.Recipe.method,
      imageUrl: this.props.Recipe.imageUrl,
    });
  }
  /**
   * @description set input value to state
   *
   * @param {any} event
   *
   * @memberof EditRecipeModal
   *
   * @returns {void}
   */
  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *@description on submit action
 *
 * @param {any} event
 *
 * @memberof EditRecipeModal
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.editRecipe(this.state);
    toastr.success('Recipe successfully changed');
    this.props.GetAllRecipes();
    this.props.toggle();
  }
  /**
 *@description upload image
 *
 * @param {any} images
 *
 * @memberof EditRecipeModal
 *
 * @returns {void}
 */
  Upload(images) {
    this.setState({ status: 'Uploading...', disabled: true });
    imageUpload(images).then((response) => {
      const { body } = response;
      const fileUrl = body.secure_url;

      if (fileUrl) {
        this.setState({
          imageUrl: fileUrl,
          status: 'Uploaded',
          disabled: false
        });
      }
    });
  }

  /**
   *@description renders jsx element
   *
   * @memberof EditRecipeModal
   *
   * @returns {void}
   */
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle} >Edit A recipe</ModalHeader>
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
                  style={{ height: 150 }}
                />
                <small style={{ color: 'red' }} className="text-center"> Enter the description seperated by commas(,)</small>

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
                  style={{ height: 150 }}
                />
                <small style={{ color: 'red' }} className="text-center"> Enter the description seperated by full-stop(.)</small>
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

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  onClick={this.onSubmit}
                  style={{ float: 'right', backgroundColor: '#A43741' }}
                  disabled={this.state.disabled}
                >Edit a recipe
                </Button>
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


export default connect(null, { editRecipe, GetAllRecipes })(EditRecipeModal);
