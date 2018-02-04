import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import '../../styles/profile.scss';
import getUserDetail from '../../actions/getUserDetail';
import EditUserModal from '../Modal/EditUserModal';
/**
 *@description User Profile
 *
 * @class Profile
 *
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * @description Creates an instance of Profile.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof Profile
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  /**
 *@description get user detail
 *
 * @method
 *
 * @memberof Profile
 *
 * @returns {void}
 */
  componentWillMount() {
    this.props.getUserDetail();
  }

  /**
 *@description set state for modal
 *
 * @memberof Profile
 *
 * @returns {void}
 */
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  /**
 *@description renders the jsx element
 *
 * @memberof Profile
 *
 * @returns {void}
 */
  render() {
    const detail = (this.props.userDetail) ? this.props.userDetail : {};
    return (
      <div>
        <NavigationBar />
        <div className="profile-header">
          <div className="dark">
            <div className="container ">
              <div className="row profile">
                <div className="col-md-5 col-sm-12 col-xs-12 mobile">
                  <div className="profile-sidebar">
                    <div className="profile-user-pic">
                      <img src={detail.profileImg || '/food1.jpg'} alt="" className="img-fluid img-circle mx-auto d-block" />
                    </div>
                    <div className="profile-user-title">
                      <div className="profile-user-name">
                        {detail.username}
                      </div>
                      <div className="profile-user-job">
                        {detail.email}
                      </div>
                    </div>
                    <div className="profile-user-buttons">
                      <button className="btn btn-danger btn-md" onClick={this.toggle} styles="cursor:pointer"> <i className="fa fa-pencil pen" aria-hidden="true" /> Edit</button>
                      <EditUserModal
                        editUser={detail}
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        getuserDetail={this.props.getUserDetail}
                      />
                    </div>
                    <div className="profile-user-menu">
                      <ul className="list-group">
                        <li className=" list-group-item activ change"><a href=""><i className="fa fa-home" aria-hidden="true" />    Overview</a></li>
                        <li className="list-group-item change" ><Link to="/change-password"><i className="fa fa-key" aria-hidden="true">  Change Password</i></Link></li>
                      </ul >
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12 mobile">
                  <div className="card card-mix" >
                    <div className="card-body">
                      <table className="table table-borderless mt-3">
                        <tbody>
                          <tr>
                            <td className="text-dark"><b> Username</b></td>
                            <td className="text-dark">{detail.username}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Email</b></td>
                            <td className="text-dark">{detail.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetail: state.userDetailReducer.userDetail,
  errors: state.userDetailReducer.errors
});


export default connect(
  mapStateToProps,
  {
    getUserDetail,
  },
)(Profile);
