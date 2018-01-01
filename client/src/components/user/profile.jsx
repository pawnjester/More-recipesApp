import React, { Component } from 'react';
// import '../../styles/profile.scss';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="heading">
          <div className="dark-overlay">
            <div className="container ">
              <div className="row profile">
                <div className="col-md-3 col-sm-12 col-xs-12">
                  <div className="profile-sidebar">
                    <div className="profile-user-pic">
                      <img src="{}" alt="" className="img-fluid img-circle mx-auto d-block" />
                    </div>
                    <div className="profile-user-title">
                      <div className="profile-user-name">
                        {}
                      </div>
                      <div className="profile-user-job">
                        {}
                      </div>
                    </div>
                    <div className="profile-user-buttons">
                      <button className="btn btn-danger btn-md" data-toggle="modal" data-target="#editProfile" styles="cursor:pointer"> <i className="fa fa-pencil" aria-hidden="true" /> Edit</button>
                    </div>
                    <div className="profile-user-menu">
                      <ul className="list-group">
                        <li className=" list-group-item activ "><a href=""><i className="fa fa-home" aria-hidden="true" />    Overview</a></li>
                        <li className="list-group-item"><a href="recipes.html"><i className="fa fa-check" aria-hidden="true">  Recipes</i></a></li>
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
                            <td><b> Name</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Phone Number</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Fax</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Email</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Address</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Country</b></td>
                            <td>{}</td>
                          </tr>
                          <tr>
                            <td><b>Marital Status</b></td>
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

export default Profile;
