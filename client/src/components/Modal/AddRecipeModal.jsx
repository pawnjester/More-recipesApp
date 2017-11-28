import React, { Component } from 'react';
import superagent from 'superagent';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import toastr from 'toastr';
import { connect } from 'react-redux';
import createRecipe from '../../actions/recipeActions';
import { Button, Container, Modal,
  ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';

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
  }


  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createRecipe(this.state, () => {
      console.log('this fired', this.state);
    });
    toastr.success('Recipe added');
    this.props.toggle();
  }

  imageUpload(files) {
    this.setState({ status: 'Uploading...' });
    const image = files[0];

    const cloudName = 'digr7ls7o';

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = 'bd7kolap';

    const paramStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}mr9XYhDjoiITDCHXlNm8jEvV03w`;

    const signature = sha1(paramStr);
    const params = {
      api_key: '569938115268323',
      timestamp,
      upload_preset: uploadPreset,
      signature,
    };
    const uploadRequest = superagent.post(url);
    uploadRequest.attach('file', image);
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key]);
    });
    uploadRequest.end((err, resp) => {
      if (err) {
        // alert(err)
        return;
      }

      //   if (resp.body.secure_url !== '') {
      //     console.log('12222', resp.body.secure_url);
      //   }

      //   console.log(`UPLOAD COMPLETE: ${JSON.stringify(resp.body)}`);
      //   const uploaded = resp.body;

      //   const updatedImages = Object.assign([], this.state.imageUrl);
      //   updatedImages.push(uploaded);
      //   console.log('56789', updatedImages[0].secure_url);

      this.setState({
        imageUrl: resp.body.secure_url,
        status: 'Uploaded',
      });
    });
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
                  placeholder="Enter the name"
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
                  placeholder="Enter the name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleFile" sm={4}>File</Label>
              <Col sm={8}>
                <Dropzone onDrop={this.imageUpload.bind(this)} />
                <h6>{ this.state.status}</h6>
                <FormText color="muted" />
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.onSubmit}>Add a recipe</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}


export default AddRecipeModal;
