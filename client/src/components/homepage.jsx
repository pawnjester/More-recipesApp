import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import Signupform from './signup/signupform';
import UpvotedRecipes from './upvotedRecipes';
import { userSignupRequest } from '../actions/signupActions';
import getFavoriteRecipe from '../actions/getFavoriteRecipes';
import getUpvotedRecipes from '../actions/getUpvotedRecipes';
import getMostFavoriteRecipe from '../actions/getMostFavoriteRecipes';
import NavigationBar from './NavigationBar';
import Footer from './common/Footer';
import '../styles/home.scss';

/**
 *@description Home
 *
 * @class Home
 *
 * @extends {React.Component}
 */
class Home extends React.Component {
  /**
   *@description checks if the user is authenticated
   *
   * @memberof Home
   *
   * @returns {void}
   */
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      const userId = JwtDecode(localStorage.jwtToken);
      this.props.getFavoriteRecipe(userId.id);
    }
  }
  /**
 *@description get upvoted and most favorite recipes
 *
 * @memberof Home
 *
 * @returns {void}
 */
  componentDidMount() {
    this.props.getUpvotedRecipes();
    this.props.getMostFavoriteRecipe();
  }
  /**
 *@description renders the jsx element
 *
 * @memberof Home
 *
 * @returns {void}
 */
  render() {
    const { userSignupRequest, upvotedRecipes, mostFavoriteRecipe } = this.props;
    const UpvotedRecipesList = upvotedRecipes || [];
    const mostFavorite = mostFavoriteRecipe || [];
    const { isAuthenticated } = this.props.auth;

    const userPage = (
      <header id="home-section">
        <div className="dark-overlay">
          <div className="home-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-none d-lg-block">
                  <h1 className="display-4 text-center col-sm-12 welcome" style={{ color: 'fff' }}> Welcome To More Recipes </h1>
                </div>
                <div className="col-md-12 text-center mt-5">
                  <Link to="/recipes" >
                    <span className="recipes-position">My recipes</span>
                  </Link>
                  <Link to="/favorites" >
                    <span className="recipes-position">Favorite Recipes</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </header >
    );

    const guestPage = (
      <header id="home-section">
        <div className="dark-overlay">
          <div className="home-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 d-none d-lg-block">
                  <h1 className="display-4" style={{ color: 'fff' }}>Let the  world know about your <strong>Recipe</strong> in three easy steps:</h1>
                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start" >
                      <i className="fa fa-check back" />

                    </div>
                    <div className="p-4 align-self-end ">
                      Create an account
                    </div>

                  </div>

                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start" >
                      <i className="fa fa-check back" />

                    </div>
                    <div className="p-4 align-self-end ">
                      Add A Recipe
                    </div>

                  </div>

                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start" >
                      <i className="fa fa-check back" />

                    </div>
                    <div className="p-4 align-self-end">
                      Relax, and let the world view your wonderful recipe
                    </div>

                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card bg-danger text-center card-form">
                    <div className="card-body">
                      <h3>Sign Up Today</h3>
                      <p>Please fill this form to register</p>
                      <Signupform userSignupRequest={userSignupRequest} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </header >

    );

    return (
      <div>
        <NavigationBar />
        {isAuthenticated ? userPage : guestPage}
        <section id="explore-head-section" className="bg-light text-muted ">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <div className="p-5">
                  <h1 className="display-5 text-dark">Search </h1>
                  <p className="lead text-dark">Search for amazing recipes available</p>
                  <Link to="/search" className="btn btn-outline-secondary dep">Find More Recipes</Link>
                </div>

              </div>

            </div>

          </div>

        </section>
        {isAuthenticated && (
          <section id="">
            <div className="conatiner text-center">
              <h1 className="pt-3 mb-5 ">Most Loved Recipes</h1>
              <div className="row ml-3 mr-3">
                {UpvotedRecipesList.length < 1 && (<h4 className="mt-5 text-center no-recipes mb-5"> No recipes yet </h4>)}
                {UpvotedRecipesList.map(upvoted => <UpvotedRecipes recipe={upvoted} key={upvoted.id} />)}
              </div>
            </div>
          </section>)}
        <section id="">
          <div className="conatiner text-center">
            <h1 className="pt-3 mb-5 ">Most Favorited Recipes</h1>
            <div className="row ml-3 mr-3">
              {mostFavorite.length < 1 && (<h4 className="mt-5 text-center no-recipes mb-5"> No recipes yet </h4>)}
              {mostFavorite.map(mostfav => <UpvotedRecipes recipe={mostfav} key={mostfav.id} />)}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  favoriteRecipe: state.recipeDetailReducer.favoriteRecipes,
  upvotedRecipes: state.recipeReducer.upvotedRecipes,
  mostFavoriteRecipe: state.recipeReducer.mostFavorites.favoriteRecipes,
});

const mapDispatchToProps = dispatch => ({
  userSignupRequest: userData => dispatch(userSignupRequest(userData)),
  getFavoriteRecipe: user => dispatch(getFavoriteRecipe(user)),
  getUpvotedRecipes: () => dispatch(getUpvotedRecipes()),
  getMostFavoriteRecipe: () => dispatch(getMostFavoriteRecipe())
});

Home.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  getUpvotedRecipes: PropTypes.func.isRequired,
  getMostFavoriteRecipe: PropTypes.func.isRequired,
  getFavoriteRecipe: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
