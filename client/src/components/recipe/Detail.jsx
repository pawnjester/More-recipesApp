import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../NavigationBar';
import '../../styles/detail.scss';

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className="header-banner" />

        <div className="container detail-container bg-white">
          <div className="row">
            <div className="col-md-8 col-sm-12" >
              <img className="card-img-top img-fluid" src={this.props.recipe.imageUrl} alt="Card image cap" />
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="detail-holder">
                <h1 className="detail-title">{this.props.recipe.name}</h1>
                <div className="card detail-card">
                  <div className="card-body clearfix">
                    <div className="row">
                    <button className="btn btn-success col-sm-6 no-border-r pt-3 pb-3">
                      <i className="fa fa-thumbs-up" aria-hidden="true" /><span>&nbsp;200</span>
                    </button>
                    <button className="btn btn-danger col-sm-6 no-border-r pt-3 pb-3">
                      <i className="fa fa-thumbs-down" aria-hidden="true" /><span>&nbsp;0</span>
                    </button>
                  </div>
                  </div>
                  <div className="card-body">
                    <h6>Description</h6>
                    <p>Fugiat esse enim sunt exercitation est cupidatat cillum duis. </p>
                  </div>
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 ">Ingredients</h6>
                    <ul>
                      <li>flower</li>
                      <li>flower</li>

                      <li>flower</li>
                      <li>flower</li>
                    </ul>
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

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
});

export default connect(mapStateToProps, {})(Detail);
