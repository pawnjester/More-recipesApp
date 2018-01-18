import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavigationBar from '../NavigationBar';
import '../../styles/detail.scss';
import GetRecipeDetail from '../../actions/getRecipeDetail';
import GetReview from '../../actions/getAllReviews';
import UpvoteRecipe from '../../actions/upvoteRecipe';
import DownvoteRecipe from '../../actions/downvoteRecipe';
import FavoriteRecipe from '../../actions/favoriteRecipe';
import GetUserDetail from '../../actions/getUserDetail';
import DeleteReview from '../../actions/deleteReview';
import Review from './Review';
import DisplayReviews from './DisplayReviews';
import Footer from '../common/Footer';

/* eslint-disable */
class Detail extends Component {
  constructor(props) {
    super(props);
    this.upvoted = this.upvoted.bind(this);
    this.onDeleteReview = this.onDeleteReview.bind(this);
  }

  componentWillMount() {
    this.props.GetRecipeDetail(this.props.match.params.recipeId);
    this.props.GetUserDetail();
  }

  upvoted() {
    this.props.UpvoteRecipe(this.props.match.params.recipeId);
  }

  onDeleteReview(reviewId) {
    this.props.DeleteReview(reviewId)
  }

  favorite() {
    this.props.FavoriteRecipe(this.props.match.params.recipeId)
      .then(() => {
        toastr.success(`${this.props.message}`);
      });
  }

  downvoted() {
    this.props.DownvoteRecipe(this.props.match.params.recipeId);
  }

  render() {
    const {
      singleRecipe, message, userDetail
    } = this.props;
    const user = this.props.userDetail ? this.props.userDetail : {};

    const single = this.props.singleRecipe.Reviews ? this.props.singleRecipe.Reviews : [];
    const style = {
      backgroundImage: `url(${singleRecipe.imageUrl})`,
    };

    return (
      <div>
        <NavigationBar />
        <div className="header-banner" style={style} />

        <div className="container detail-container bg-white">
          <div className="row">
            <div className="col-md-8 col-sm-12" >
              <img className="card-img-top img-fluid" src={singleRecipe.imageUrl} alt="Card image cap" />
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="detail-holder">
                <h1 className="detail-title">{singleRecipe.name}</h1>
                <div className="card detail-card">
                  <div className="card-body clearfix">
                    <div className="row">
                      <button className="btn btn-success col-sm-4 no-border-r pt-3 pb-3" onClick={() => this.upvoted()}>
                        <i className="fa fa-thumbs-up" aria-hidden="true" /><span>&nbsp;{singleRecipe.upVotes}</span>
                      </button>
                      <button className="btn btn-danger col-sm-4 no-border-r pt-3 pb-3" onClick={() => this.downvoted()}>
                        <i className="fa fa-thumbs-down" aria-hidden="true" /><span>&nbsp;{singleRecipe.downVotes}</span>
                      </button>
                      <button className="btn btn-white col-sm-4 no-border-x pt-3 pb-3" onClick={() => this.favorite()}>
                        <i className="fa fa-heart" aria-hidden="true" /><span>&nbsp;</span>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6>Description</h6>
                    <p>{singleRecipe.method} </p>
                  </div>
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 ">Ingredients</h6>
                    {singleRecipe.ingredients}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Review recipeId={singleRecipe.id} />
          <div className="container mb-5 mt-5">
            <h1>Reviews</h1>
            <hr />
            {single.length < 1 && (<h4 className="mt-5 text-center" > No reviews </h4>)}
            {single.map(reviewed =>
              <DisplayReviews key={reviewed.id} Review={reviewed} deleteReview={this.onDeleteReview} userDetail={user}/>)}
          </div>
        </div>
        <Footer />
      </div>


    );
  }
}

Detail.propTypes = {
  GetRecipeDetail: PropTypes.func.isRequired,
  UpvoteRecipe: PropTypes.func.isRequired,
  DownvoteRecipe: PropTypes.func.isRequired,
  FavoriteRecipe: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  singleRecipe: state.recipeDetailReducer.currentRecipe,
  favoriteRecipes: state.recipeDetailReducer.favoriteRecipe,
  message: state.recipeDetailReducer.message.message,
  userDetail: state.userDetailReducer.userDetail,
});

export default connect(mapStateToProps, {
  GetRecipeDetail, GetReview, UpvoteRecipe, DownvoteRecipe, FavoriteRecipe, GetUserDetail, DeleteReview
})(Detail);
