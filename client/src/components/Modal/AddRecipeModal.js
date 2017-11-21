import React, { Component } from 'react';
import superagent from 'superagent';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import { connect } from 'react-redux';
import createRecipe from '../../actions/recipeActions';
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';

class AddRecipeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
          name: '',
          ingredients: '',
          method: '',
          imageUrl: '',
        }
        
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onNameChange(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    imageUpload = (files) => {
      console.log('uploadFile: ')      
      const image = files[0]
      
      const cloudName = 'digr7ls7o'
  
      const url =  'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
      
      const timestamp = Date.now()/1000
      const uploadPreset = 'bd7kolap'
  
      const paramStr ='timestamp='+timestamp+'&upload_preset='+uploadPreset+'mr9XYhDjoiITDCHXlNm8jEvV03w';
  
      const signature = sha1(paramStr);
      console.log('****')
  
      const params = {
          'api_key': '569938115268323',
          'timestamp' : timestamp,
          'upload_preset': uploadPreset,
          'signature': signature
        }
      let uploadRequest = superagent.post(url)
      uploadRequest.attach('file', image)
      console.log('999')
  
      Object.keys(params).forEach((key) => {
          uploadRequest.field(key, params[key])
          })
      console.log('hgjk')
      uploadRequest.end((err, resp) => {
        if(err) {
          // alert(err)
          return
        }

      console.log('gorilla')
  
  
      if (resp.body.secure_url !== '') {
        console.log('12222',resp.body.secure_url);
      }
  
        console.log('UPLOAD COMPLETE: '+JSON.stringify(resp.body))
        const uploaded = resp.body
  
        let updatedImages = Object.assign([], this.state.imageUrl)
        updatedImages.push(uploaded)
        console.log('56789',updatedImages[0].secure_url)
  
        this.setState({
          imageUrl: updatedImages[0].secure_url
        })
      })
  
  } 

    onSubmit = (event) => {
        event.preventDefault();

        console.log('*******************gone', this.state.imageUrl)
        
        this.props.createRecipe(this.state, () => {
          console.log('this fired', this.state)
        })
        this.props.toggle();
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

              <FormGroup row>
                <Label for="exampleFile" sm={4}>File</Label>
                <Col sm={8}>
                <Dropzone onDrop={this.imageUpload.bind(this)} />
                <FormText color="muted">
                </FormText>
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
    

    

export default AddRecipeModal;