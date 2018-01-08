import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar';
import '../../styles/profile.scss';
import getUserDetail from '../../actions/getUserDetail';
import EditUserModal from '../Modal/EditUserModal';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    // TODO: get recipes list
    this.props.getUserDetail();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const detail = (this.props.userDetail) ? this.props.userDetail : {};
    console.log('>>>>12345', detail);
    return (
      <div>
        <NavigationBar />
        <div className="heading mt-5">
          <div className="dark-overlay">
            <div className="container ">
              <div className="row profile">
                <div className="col-md-3 col-sm-12 col-xs-12">
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
                      <button className="btn btn-danger btn-md" onClick={this.toggle} styles="cursor:pointer"> <i className="fa fa-pencil" aria-hidden="true" /> Edit</button>
                      <EditUserModal
                        editUser={detail} // state
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        getuserDetail={this.props.getUserDetail}
                      />
                    </div>
                    <div className="profile-user-menu">
                      <ul className="list-group">
                        <li className=" list-group-item activ change"><a href=""><i className="fa fa-home" aria-hidden="true" />    Overview</a></li>
                        <li className="list-group-item change" ><a href="recipes.html"><i className="fa fa-check" aria-hidden="true">  Recipes</i></a></li>
                      </ul >
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card" >
                    <div className="card-body">
                      <table className="table table-borderless mt-3">
                        <tbody>
                          <tr>
                            <td className="text-dark"><b> Name</b></td>
                            <td className="text-dark">{detail.username}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Phone Number</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Fax</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Email</b></td>
                            <td className="text-dark">{detail.email}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Address</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Country</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><b>Marital Status</b></td>
                            <td>{}</td>
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
});


export default connect(
  mapStateToProps,
  {
    getUserDetail,
  },
)(Profile);
