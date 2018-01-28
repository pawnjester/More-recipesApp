import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import addReview from '../../actions/reviewRecipe';
import '../../styles/detail.scss';
/**
 *
 * @class Reviews
 *
 * @extends {Component}
 */
class Reviews extends Component {
  /**
   * @description Creates an instance of Reviews.
   *
   * @param {any} props
   *
   * @memberof Reviews
   */
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *@description set the input to state

   * @param {any} event
   *
   * @memberof Reviews
   *
   * @returns {void}
   */
  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 * @description on submit
 *
 * @param {any} event
 *
 * @memberof Reviews
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    const id = this.props.recipeId;
    this.props.addReview(id, this.state);
    toastr.success('Review added!!');
    this.setState({ data: '' });
  }
  /**
 * @description renders the jsx element
 *
 * @memberof Reviews
 *
 * @returns {void}
 */
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
  addReview: PropTypes.func.isRequired,
};

export default connect(null, { addReview })(Reviews);
