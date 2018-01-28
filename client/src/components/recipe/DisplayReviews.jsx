import React, { Component } from 'react';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import toastr from 'toastr';

/**
 *
 * @class DisplayReview
 *
 * @extends {Component}
 */
class DisplayReview extends Component {
  /**
   * Creates an instance of DisplayReview.
   *
   * @param {any} props
   *
   * @memberof DisplayReview
   */
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  /**
 *@description delete action
 *
 * @memberof DisplayReview
 *
 * @returns {void}
 */
  onDelete() {
    confirmAlert({
      title: 'Delete this review',
      message: 'Are you sure you want to do this?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.deleteReview(this.props.Review.id),
      onCancel: () => toastr.success('Good choice!')
    });
  }
  /**
 *@description renders the jsx element
 *
 * @memberof DisplayReview
 *
 * @returns {void}
 */
  render() {
    return (
      <div>
        <div className="container mb-1 ">
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <img className="col-sm-2 card-img-top img-fluid round define-width text-center" alt="profile" src={this.props.Review.User.profileImg} />
                    <div className="col-sm-8">
                      <p className="card-text">{this.props.Review.data}</p>
                      <p className="card-text"><b>posted by</b> {this.props.Review.User.username} </p>
                      <p className="card-text bold">{moment(new Date(this.props.Review.createdAt)).fromNow()}</p>
                    </div>
                    {this.props.Review.User.id === this.props.userDetail.id && <span aria-hidden="true" onClick={() => this.onDelete()} style={{ fontSize: 25 }}>&times;</span>}
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

export default DisplayReview;
