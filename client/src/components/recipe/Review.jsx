import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import addReview from '../../actions/reviewRecipe';
import validateInput from '../validations/reviewValidation';
import '../../styles/detail.scss';
/**
 *
 * @class Reviews
 *
 * @extends {Component}
 */
export class Reviews extends Component {
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
      errors: {},
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
    if (this.isValid()) {
      const id = this.props.recipeId;
      this.props.addReview(id, this.state);
      toastr.success('Review added!!');
      this.setState({ data: '' });
    }
  }

  /**
 *
 * @memberof AddRecipeModal
 *
 * @returns {void}
 */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
 * @description renders the jsx element
 *
 * @memberof Reviews
 *
 * @returns {void}
 */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="col-sm-12 pt-5 pb-5">
          <div className="add-review">
            <h2 className="mb-3">Add A Review</h2>
            <form onSubmit={this.onSubmit} id="add-review-section" >
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
              {errors.data && <small style={{ color: '#A43741' }}>{errors.data}</small>}
              <button
                type="submit"
                className="btn
              btn-outline-light
              pull-right
              bg-danger
              btn-lg
              add-review-btn"
              >
              POST
              </button>
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
