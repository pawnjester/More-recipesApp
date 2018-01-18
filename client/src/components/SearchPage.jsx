import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from '../components/common/Footer';
import '../styles/search.scss';
import '../styles/recipes.scss';
import Search from '../actions/searchRecipe';
/* eslint-disable */

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      search: '',
      searchErrors: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { recipes, searchErrors } = nextProps;
    console.log('filler',nextProps)
    this.setState({ recipes, searchErrors });
  }

  onNameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.Search(event.target.value);
    console.log('>>>', this.state.search);
  }



  render() {
    const style = {
      height: 200,
    };
    let recipes = (this.state.recipes) ? (this.state.recipes) : []
    console.log('ertt', recipes);
      const recipesList = recipes.map(recipe => (
        <div className="col-md-4 col-xs-12 " >
        <div className="card">
          <img className="card-img-top" src={recipe.imageUrl} style={style} alt="recipeImage" />
          <div className="card-body">
            <h4 className="card-title text-center">{recipe.name}</h4>
          </div>
          <div className="card-body clearfix">
            <Link to={`/detail/${recipe.id}`}>
              <div className="text-center text-primary float-center">
                <i className="fa fa-eye" aria-hidden="true" /><span id="clickableAwesomeFont" className="view" >&nbsp;View</span>
              </div>
            </Link>

          </div>
        </div>
      </div>));

      console.log('>>>123recipe', recipesList);
    return (
      <div>
        <NavigationBar />
        <div className="container">
        <h1 className="text-center top-margin text-danger">Search New Awesome Recipes</h1>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            name="search"
            placeholder="Search Recipe name or ingredients"
            aria-label="Search"
            onChange={this.onNameChange}
          />
        </form>
        <br />
        {recipesList.length > 0 && <h4 className="text-center"> Search results</h4>}
        {this.state.searchErrors && <h4 className="text-center text-danger"> No result(s) found</h4>}
        <br />
        <div className="row high">
            {recipesList}
        </div>
        </div>
        <Footer />
      </div>
    )
  }
}

SearchPage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
  searchErrors: PropTypes.bool
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  searchErrors: state.recipeReducer.error
});

export default connect(mapStateToProps, { Search })(SearchPage);
