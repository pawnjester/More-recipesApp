import React from 'react';
import moment from 'moment';


const DisplayReview = props => (
  <div>
    <div className="container mb-1 ">
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <img className="col-sm-2 card-img-top img-fluid round define-width text-center" src={props.Review.User.profileImg} />
                <div className="col-sm-8">
                  <p className="card-text">{props.Review.data}</p>
                  <p className="card-text"><b>posted by</b> {props.Review.User.username} </p>
                  <p className="card-text bold">{moment(new Date(props.Review.createdAt)).fromNow()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DisplayReview;
