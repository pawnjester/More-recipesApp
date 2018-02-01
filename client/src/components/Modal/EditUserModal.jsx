import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal,
  ModalHeader, ModalBody, Form, Label, Input, FormGroup, Col, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import toastr from 'toastr';
import editUserDetail from '../../actions/editUserDetail';
import imageUpload from '../../helpers/imageUpload';


/**
 *@description Edit User Modal
 *
 * @class EditUserModal
 *
 * @extends {Component}
 */
class EditUserModal extends Component {
  /**
   * Creates an instance of EditUserModal.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof EditUserModal
   *
   * @returns {void}
   */
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
  /**
 *@description set the user input to state
 *
 * @param {any} event
 *
 * @memberof EditUserModal
 *
 * @returns {void}
 */
  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *@description submit button
 *
 * @param {any} event
 *
 * @memberof EditUserModal
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.editUserDetail(this.state).then(() => {
      if (this.props.errors) {
        toastr.error(this.props.errors);
      } else {
        toastr.success('User successfully changed');
      }
    });
    this.props.getuserDetail();
    this.props.toggle();
  }
  /**
 *@description upload images
 *
 * @param {any} images
 * @memberof EditUserModal
 *
 * @returns {void}
 */
  Upload(images) {
    this.setState({ status: 'Uploading...' });
    imageUpload(images).then((response) => {
      const { body } = response;
      const fileUrl = body.secure_url;

      if (fileUrl) {
        this.setState({
          profileImg: fileUrl,
          status: 'Uploaded'
        });
      }
    });
  }
  /**
 *
 * @description renders the jsx element
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
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
  editUserDetail: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  getuserDetail: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.userDetailReducer.errors
});


export default connect(mapStateToProps, { editUserDetail })(EditUserModal);
