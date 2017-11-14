import React, { Component } from 'react';
import { Button,Container, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';

    const AddRecipeModal = (props) => {
        return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
              <ModalHeader toggle={props.toggle}>Add A recipe</ModalHeader>
              <ModalBody>
                <Form>
                <FormGroup row>
                <Label for="exampleEmail" sm={4}>Name</Label>
                <Col sm={8}>
                  <Input type="text" name="text" id="exampleEmail" placeholder="Enter the name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={4}>Ingredients</Label>
                <Col sm={8}>
                  <Input type="text" name="text" id="examplePassword" placeholder="Enter the ingredients"/>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label for="exampleFile" sm={2}>File</Label>
              <Col sm={10}>
                <Input type="file" name="file" id="exampleFile" />
              </Col>
            </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button  styles = "cursor:pointer">Add a recipe</Button>
                </Col>
              </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            )
      }

      export default AddRecipeModal;