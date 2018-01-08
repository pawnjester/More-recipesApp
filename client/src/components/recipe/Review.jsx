import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import AddReview from '../../actions/reviewRecipe';
import GetRecipeDetail from '../../actions/getRecipeDetail';
import '../../styles/detail.scss';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const id = this.props.recipeId;
    this.props.AddReview(id, this.state);
    toastr.success('Review added!!');
    event.target.reset();
    this.setState({ data: '' });
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 pt-5 pb-5">
          <div className="add-review">
            <h2 className="mb-3">Add A Review</h2>
            <form onSubmit={this.onSubmit} >
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="data"
                  value={this.state.data}
                  onChange={this.onNameChange}
                  placeholder="Write A Review..."
                  
                />
              </div>
              <button type="submit" className="btn btn-outline-light  pull-right bg-danger btn-lg">POST</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  AddReview: PropTypes.func.isRequired,
};

export default connect(null, { AddReview, GetRecipeDetail })(Reviews);
