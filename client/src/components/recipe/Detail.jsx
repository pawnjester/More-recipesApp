import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../NavigationBar';
import '../../styles/detail.scss';
import getRecipeDetail from '../../actions/getRecipeDetail';
import getReview from '../../actions/getAllReviews';
import upvoteRecipe from '../../actions/upvoteRecipe';
import downvoteRecipe from '../../actions/downvoteRecipe';
import Reviews from './Review';
import DisplayReviews from './DisplayReviews';


class Detail extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   voted: {},
    // }
    this.upvoted = this.upvoted.bind(this);
  }

  componentWillMount() {
    this.props.getRecipeDetail(this.props.match.params.recipeId);
    this.props.getReview(this.props.match.params.recipeId);
  }
  // componentDidMount() {
  //   // this.props.getReview(this.props.match.params.recipeId);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.votes.success) {
  //     this.setState({
  //       voted: nextProps.votes.votes,
  //     })
  //   }

  // }

  upvoted() {
    console.log('upvoted');
    this.props.upvoteRecipe(this.props.match.params.recipeId);
  }

  downvoted() {
    console.log('downvoted');
    this.props.downvoteRecipe(this.props.match.params.recipeId);
  }

  render() {
    const { singleRecipe } = this.props;
    console.log('>>>>>>>>>>>>', singleRecipe);
    const review = (this.props.reviews) ? this.props.reviews : [];
    const voted = (this.props.votes) ? this.props.votes : [];
    // console.log('UPPPP',voted);
    console.log('#$$%%', voted);


    return (
      <div>
        <NavigationBar />
        <div className="header-banner" style={{}} />

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
                      <button className="btn btn-success col-sm-6 no-border-r pt-3 pb-3" onClick={() => this.upvoted()}>
                        <i className="fa fa-thumbs-up" aria-hidden="true" /><span>&nbsp;{singleRecipe.upVotes}</span>
                      </button>
                      <button className="btn btn-danger col-sm-6 no-border-r pt-3 pb-3" onClick={() => this.downvoted()}>
                        <i className="fa fa-thumbs-down" aria-hidden="true" /><span>&nbsp;{singleRecipe.downVotes}</span>
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
        </div>
        <Reviews recipeId={singleRecipe.id} />
        <div className="container mb-5 ">
          <h1>Reviews</h1>
          {review.map(reviewed =>
            <DisplayReviews key={reviewed.id} review={reviewed} />)}
        </div>
      </div>


    );
  }
}

Detail.propTypes = {
  getRecipeDetail: PropTypes.func.isRequired,
  getReview: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  singleRecipe: state.recipeDetailReducer.currentRecipe,
  reviews: state.review.reviewed,
  votes: state.voteReducer.votes,
});

export default connect(mapStateToProps, {
  getRecipeDetail, getReview, upvoteRecipe, downvoteRecipe,
})(Detail);

