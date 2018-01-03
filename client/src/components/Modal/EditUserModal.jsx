import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import sha1 from 'sha1';
import { connect } from 'react-redux';
import toastr from 'toastr';
import userDetail from '../../actions/editUserDetail';


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
    this.imageUpload = this.imageUpload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('>>>>nextProps', nextProps);
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

  imageUpload(files) {
    this.setState({ status: 'Uploading...' });
    const image = files[0];

    const cloudName = process.env.CLOUDNAME;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now() / 1000;
    const uploadPreset = process.env.UPLOADPRESET;

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
        toastr.success('User cannot be edited');
        return;
      }

      this.setState({
        profileImg: resp.body.secure_url,
        status: 'Uploaded',
      });
    });
  }
  render() {
    const editedUser = (this.props.editUser) ? this.props.editUser : {};
    console.log('123', editedUser);
    console.log('12323434', this.props.userDetail);
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Edit A User</ModalHeader>
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
                <Dropzone onDrop={this.imageUpload} />
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
