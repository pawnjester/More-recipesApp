import React, { Component } from 'react';
import toastr from 'toastr';
import {
  Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText
} from 'reactstrap';
import imageUpload from '../../helpers/imageUpload';
import validateInput from '../validations/recipeValidation';
/**
 *
 * @class AddRecipeModal
 *
 * @extends {Component}
 */
class AddRecipeModal extends Component {
  /**
   * Creates an instance of AddRecipeModal.
   *
   * @param {any} props
   *
   * @memberof AddRecipeModal
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: '',
      method: '',
      imageUrl: '',
      cookingTime: '',
      status: '',
      errors: {},
      titleError: '',
      option: 'minute(s)',
      disabled: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }

  /**
 *@description set the input to state
 *
 * @param {any} event
 *
 * @memberof AddRecipeModal
 *
 * @returns {void}
 */
  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *@description onSubmit button event
 *
 * @param {any} event
 * @memberof AddRecipeModal
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      const {
        name, ingredients, method, imageUrl, cookingTime, option
      } = this.state;
      const cooking = cookingTime.concat(option);
      this.state.cookingTime = cooking;
      this.props.createRecipe(this.state).then((res) => {
        if (Object.entries(this.props.errors).length > 0) {
          this.setState({
            titleError: this.props.errors
          });
          toastr.warning(this.props.errors);
        } else {
          this.props.getRecipe(this.props.currentPage);
          this.setState({
            name: '',
            ingredients: '',
            method: '',
            imageUrl: '',
            cookingTime: '',
          });
          toastr.success('Recipe added');
          this.props.toggle();
        }
      });
    }
  }

  /**
 *
 * @memberof AddRecipeModal
 *
 * @returns {void}
 */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
 *
 * @param {any} images
 *
 * @memberof AddRecipeModal
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
 * @description renders the jsx element
 *
 * @memberof AddRecipeModal
 *
 * @returns {void}
 */
  render() {
    const { errors, titleError } = this.state;
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
                {(errors.name || titleError) && <small style={{ color: '#A43741' }}>{(errors.name || titleError)}</small>}
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
                {errors.ingredients && <small style={{ color: '#A43741' }}>{errors.ingredients}</small>}
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
                {errors.method && <small style={{ color: '#A43741' }}>{errors.method}</small>}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>Preparation Time</Label>
              <Col sm={9} row>
                <Input
                  type="text"
                  name="cookingTime"
                  id="exampleEmail"
                  value={this.state.cookingTime}
                  onChange={this.onNameChange}
                  placeholder="Enter the preparation time"
                />

                <Col sm={15} row>
                  <Input
                    type="select"
                    name="option"
                    id="exampleSelect"
                    className="mt-3"
                    value={this.state.option}
                    onChange={this.onNameChange}
                  >
                    <option value="second(s)">second(s)</option>
                    <option value="minute(s)">minute(s)</option>
                    <option value="hour(s)">hour(s)</option>
                  </Input>
                </Col>
                {(errors.error || errors.cookingTime) && <small style={{ color: '#A43741' }}>{(errors.error || errors.cookingTime)}</small>}
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
                <Button
                  onClick={this.onSubmit}
                  style={{ float: 'right', backgroundColor: '#A43741' }}
                  disabled={this.state.disabled}
                >Add a recipe
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}


export default AddRecipeModal;
