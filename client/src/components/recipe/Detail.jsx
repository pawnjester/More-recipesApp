import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavigationBarComponent from '../NavigationBar';
import '../../styles/detail.scss';
import getRecipeDetail from '../../actions/getRecipeDetail';
import getReview from '../../actions/getAllReviews';
import upvoteRecipe from '../../actions/upvoteRecipe';
import downvoteRecipe from '../../actions/downvoteRecipe';
import favoriteRecipe from '../../actions/favoriteRecipe';
import getUserDetail from '../../actions/getUserDetail';
import deleteReview from '../../actions/deleteReview';
import Review from './Review';
import DisplayReviews from './DisplayReviews';
import FooterComponent from '../common/Footer';
/**
 *
 * @class Detail
 *
 * @extends {Component}
 */
export class Detail extends Component {
  /**
   *@description Creates an instance of Detail.
   *
   * @param {any} props
   *
   * @memberof Detail
   */
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.upvoted = this.upvoted.bind(this);
    this.onDeleteReview = this.onDeleteReview.bind(this);
  }
  /**
 *@description get recipe detail and user detail
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  componentDidMount() {
    this.props.getRecipeDetail(this.props.match.params.recipeId);
    this.props.getUserDetail();
  }

  /**
 *
 * @param {any} reviewId
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  onDeleteReview(reviewId) {
    this.props.deleteReview(reviewId);
  }

  /**
 *@description upvoted action
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  upvoted() {
    this.props.upvoteRecipe(this.props.match.params.recipeId);
  }
  /**
 *@description favorite recipe
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  favorite() {
    this.props.favoriteRecipe(this.props.match.params.recipeId)
      .then(() => {
        toastr.success(`${this.props.message}`);
      });
  }
  /**
 *@description downvote a recipe
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  downvoted() {
    this.props.downvoteRecipe(this.props.match.params.recipeId);
  }
  /**
 *@description renders jsx element
 *
 * @memberof Detail
 *
 * @returns {void}
 */
  render() {
    const {
      singleRecipe, favoriteStatus
    } = this.props;
    const ingredientss = singleRecipe.ingredients ? singleRecipe.ingredients : '';
    const methods = singleRecipe.method ? singleRecipe.method : '';
    const splittedMethod = methods.split('.');
    const splittedIngredients = ingredientss.split(',');
    const user = this.props.userDetail || {};
    const single = this.props.singleRecipe.Reviews || [];
    const style = {
      backgroundImage: `url(${singleRecipe.imageUrl})`,
    };

    return (
      <div>
        <NavigationBarComponent search="true" />
        <div className="header-banner" style={style} />

        <div className="container detail-container bg-white">
          <div className="row">
            <div className="col-md-8 col-sm-12" >
              <img
                className="card-img-top img-fluid"
                src={singleRecipe.imageUrl}
                alt="Card cap"
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="detail-holder">
                <h1
                  className="detail-title
                wrap-word"
                >{singleRecipe.name}
                </h1>
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                />
                <span
                  id="clickableAwesomeFont"
                  className="view"
                >
                  {singleRecipe.viewCount}
                </span>
                <div className="card detail-card">
                  <div className="card-body clearfix">
                    <div className="row">
                      <button
                        className="btn
                        btn-success
                        col-sm-4
                        no-border-r
                        pt-3 pb-3
                        upvote-btn"
                        onClick={() => this.upvoted()}
                      >
                        <i
                          className="fa
                        fa-thumbs-up
                        upvote-state"
                          aria-hidden="true"
                          style={{ color: 'white' }}
                        />
                        <span id="upvote-state">
                          {singleRecipe.upVotes}
                        </span>
                      </button>
                      <button
                        className="btn
                      btn-danger
                      col-sm-4
                      no-border-r
                      pt-3 pb-3
                      downvote-btn"
                        onClick={() => this.downvoted()}
                      >
                        <i
                          className="fa
                        fa-thumbs-down"
                          aria-hidden="true"
                          style={{ color: 'white' }}
                        />
                        <span id="downvote-state">
                          {singleRecipe.downVotes}
                        </span>
                      </button>
                      <button
                        className="btn
                      btn-white
                      col-sm-4
                      no-border-x
                      pt-3 pb-3
                      favorite-btn"
                        onClick={() => this.favorite()}
                      >
                        <i
                          className="fa fa-heart"
                          aria-hidden="true"
                          style={(favoriteStatus) ? { color: 'red' } : { color: 'grey' }}
                        /><span>&nbsp;</span>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6>Cooking Time</h6>
                    <p><i
                      className="fa
                    fa-clock-o mr-2"
                      aria-hidden="true"
                      style={{ color: 'orange', fontSize: 25 }}
                    />
                      {singleRecipe.cookingTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container detail-height">
            <div className="row">
              <div className="col-md-6 col-sm-12 mt-5">
                <h4 className="text-center">Preparation</h4>
                <ul className="list-group wrap-word">
                  {
                    splittedMethod.map((split, index) =>
                      <li className="list-group-item" key={`${index}`}>{split}</li>)
                  }
                </ul>
              </div>
              <div className="col-md-6 col-sm-12 mt-5">
                <h4 className="text-center">Ingredients</h4>
                <ul className="list-group wrap-word">
                  {splittedIngredients.map((split, index) =>
                    <li className="list-group-item" key={`${index}`}>{split}</li>)
                  }
                </ul>
              </div>

            </div>
          </div>
          <Review recipeId={singleRecipe.id} />
          <div className="container mb-5 mt-5">
            <h1>Reviews</h1>
            <hr />
            {single.length < 1 && (<h4 className="mt-5 text-center" > No reviews </h4>)}
            {single.map(reviewed =>
              (<DisplayReviews
                key={reviewed.id}
                Review={reviewed}
                deleteReview={this.onDeleteReview}
                userDetail={user}
              />))}
          </div>
        </div>
        <FooterComponent />
      </div>


    );
  }
}

Detail.propTypes = {
  getRecipeDetail: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  getUserDetail: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  singleRecipe: state.recipeDetailReducer.currentRecipe,
  message: state.recipeDetailReducer.message.message,
  userDetail: state.userDetailReducer.userDetail,
  favoriteStatus: state.recipeDetailReducer.favoriteStatus
});

export default connect(mapStateToProps, {
  getRecipeDetail,
  getReview,
  upvoteRecipe,
  downvoteRecipe,
  favoriteRecipe,
  getUserDetail,
  deleteReview
})(Detail);
