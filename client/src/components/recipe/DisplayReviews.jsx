import React from 'react';

const DisplayReview = props => (
  <div>
    <div className="container mb-5 ">
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <img className="col-sm-2 card-img-top img-fluid round define-width text-center" src="" alt="Card image cap" />
                <div className="col-sm-8">
                  <p className="card-text">{props.review.data}</p>
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
