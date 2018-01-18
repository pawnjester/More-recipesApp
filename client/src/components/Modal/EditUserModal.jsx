import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import toastr from 'toastr';
import userDetail from '../../actions/editUserDetail';
import imageUpload from '../../helpers/imageUpload';


/* eslint-disable */

class EditUserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      profileImg: '',
      status: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editUser) {
      this.setState({
        username: nextProps.editUser.username,
        email: nextProps.editUser.email,
        profileImg: nextProps.editUser.profileImg,
      });
    }
  }

  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.userDetail(this.state);
    toastr.success('User successfully changed');
    this.props.getuserDetail();
    this.props.toggle();
  }

  Upload(images) {
    this.setState({ status: 'Uploading...'})
    imageUpload(images).then((response) => {
      const { body } = response
      const fileUrl = body.secure_url;

      if(fileUrl) {
        this.setState({
          profileImg: fileUrl,
          status: 'Uploaded'
        })
      }
    })
  }

  render() {
    const editedUser = (this.props.editUser) ? this.props.editUser : {};
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle} className="set-align">Edit A User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={4}>username</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="username"
                  id="exampleEmail"
                  value={this.state.username}
                  onChange={this.onNameChange}
                  placeholder="Enter the name"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={4}>email</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="email"
                  id="exampleEmail"
                  value={this.state.email}
                  onChange={this.onNameChange}
                  placeholder="Enter the email"
                />
              </Col>
            </FormGroup>

            {/* <FormGroup row>
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
            </FormGroup> */}

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
                <Button onClick={this.onSubmit}>Edit profile</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

EditUserModal.propTypes = {
  userDetail: PropTypes.func.isRequired,

};


export default connect(null, { userDetail })(EditUserModal);
