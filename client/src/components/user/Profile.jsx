import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationBarComponent from '../NavigationBar';
import '../../styles/profile.scss';
import getUserDetail from '../../actions/getUserDetail';
/**
 *@description User Profile
 *
 * @class Profile
 *
 * @extends {Component}
 */
export class Profile extends Component {
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
        <NavigationBarComponent />
        <div className="profile-header">
          <div className="dark">
            <div className="container ">
              <div className="row profile-page">
                <div className="col-md-5 col-sm-12 col-xs-12 mobile">
                  <div className="profile-sidebar">
                    <div className="profile-user-pic">
                      <img
                        src={detail.profileImg || '/food1.jpg'}
                        alt=""
                        className="img-fluid img-circle mx-auto d-block"
                      />
                    </div>
                    <div className="profile-user-title">
                      <div className="profile-user-name">
                        {detail.username}
                      </div>
                      <div className="profile-user-job">
                        {detail.email}
                      </div>
                    </div>
                    <div className="profile-user-menu">
                      <ul className="list-group">
                        <li className=" list-group-item activ change">
                          <a href="">
                            <i className="fa fa-home" aria-hidden="true" />
                        Overview
                          </a>
                        </li>
                        <li className="list-group-item change" >
                          <Link
                            to="/change-password"
                            className="change-password-link"
                          >
                            <i className="fa fa-key" aria-hidden="true">
                        Change Password
                            </i>
                          </Link>
                        </li>
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
