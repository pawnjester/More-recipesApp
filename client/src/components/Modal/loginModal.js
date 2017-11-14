import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, Container, Modal, 
  ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup, Col, FormText} from 'reactstrap';

const LoginModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Please Sign in</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup row>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter an email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter a password"/>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button  styles = "cursor:pointer">Submit</Button>
          </Col>
        </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      )
}
export default LoginModal
