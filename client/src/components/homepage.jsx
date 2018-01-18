import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import Signupform from './signup/SignUpForm';
import { userSignupRequest } from '../actions/signupActions';
import GetFavoriteRecipe from '../actions/getFavoriteRecipes';
import NavigationBar from './NavigationBar';
import Footer from './common/Footer';
// import CarouselSlide from './Carousel';
import '../styles/home.scss';
/*eslint-disable */


class Home extends React.Component {
  componentWillMount() {
    const userId = JwtDecode(localStorage.jwtToken);
    this.props.GetFavoriteRecipe(userId.id);
  }
  render() {
    const { userSignupRequest } = this.props;
    const { isAuthenticated } = this.props.auth;

    const userPage = (
      <header id="home-section">
      <div className="dark-overlay">
        <div className="home-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-none d-lg-block">
            <h1 className="display-4 text-center" style={{ color: 'fff' }}> Welcome To More Recipes </h1>
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

    )

    return (
      <div>
        <NavigationBar />
        {isAuthenticated ? userPage : guestPage}
        <section id ="explore-head-section" className="bg-light text-muted ">
        <div className= "container">
          <div className ="row">
            <div className="col text-center">
              <div className= "p-5">
                <h1 className="display-5 text-dark">Search </h1>
                <p className="lead text-dark">Search for amazing recipes available</p>
                <Link to="/search" className="btn btn-outline-secondary dep">Find More Recipes</Link>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* <section id="">
      <CarouselSlide />
      </section> */}
      <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    favoriteRecipe: state.recipeDetailReducer.favoriteRecipes,
  };
}

Home.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { userSignupRequest, GetFavoriteRecipe })(Home);
