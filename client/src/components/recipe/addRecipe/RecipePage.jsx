import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import LoaderComponent from '../../common/Loader';
import createRecipe from '../../../actions/addRecipe';
import getRecipes from '../../../actions/getRecipe';
import deleteRecipe from '../../../actions/deleteRecipe';
import getRecipeDetail from '../../../actions/getRecipeDetail';
import editRecipe from '../../../actions/editRecipe';
import NavigationBarComponent from '../../NavigationBar';
import '../../../styles/recipes.scss';
import Recipe from './Recipe';
import AddRecipeModalComponent from '../../Modal/AddRecipeModal';
import FooterComponent from '../../common/Footer';

/**
 * @description RecipePage component
 *
 * @class RecipePage
 *
 * @extends {Component}
 */
export class RecipePage extends Component {
  /**
   * Creates an instance of RecipePage.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof RecipePage
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      recipes: [],
      loading: true,
      currentPage: 1,
      pages: 1,
      errors: '',
    };

    this.toggle = this.toggle.bind(this);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 * @description get recipes
 *
 * @method
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  componentDidMount() {
    this.props.getRecipes()
      .then(() => {
        this.setState({ loading: false });
      });
  }
  /**
 * @description set state
 *
 * @param {any} nextProps
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  componentWillReceiveProps(nextProps) {
    const {
      currentPage
    } = this.state;
    this.setState({
      recipes: nextProps.recipes,
      pages: nextProps.pages,
    });
    if (nextProps.deleted) {
      this.props.getRecipes(nextProps.totalContent < 1 ?
        currentPage - 1 :
        currentPage);
    }
  }

  /**
 *
 * @param {any} recipeId
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  onDeleteRecipe(recipeId) {
    this.props.deleteRecipe(recipeId);
  }
  /**
 *@description set state to currentPage
 *
 * @param {any} data
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  onPageChange(data) {
    data.selected += 1;
    this.props.getRecipes(data.selected);
    this.setState({
      currentPage: data.selected
    });
  }
  /**
 *@description toggle modal
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  /**
 *
 * @description renders the jsx element
 *
 * @memberof RecipePage
 *
 * @returns {void}
 */
  render() {
    const {
      recipes, pages, currentPage
    } = this.state;
    const recipeList = recipes || [];

    return (
      <div>
        <NavigationBarComponent search="true" />
        <div className="container text-center">
          <div className="heading">
            <h1 className="p-5 ">My Recipes</h1>
            <Button
              color="primary"
              className="addrecipebtn btn btn-outline-success "
              onClick={this.toggle}
            >
              <i className="fa fa-plus" />Recipe
            </Button>
            <AddRecipeModalComponent
              isOpen={this.state.modal}
              toggle={this.toggle}
              createRecipe={this.props.createRecipe}
              errors={this.state.errors}
              serverError={this.props.errors}
              getRecipe={this.props.getRecipes}
              currentPage={currentPage}
            />
          </div>
          <hr />
          <div className="high">
            {this.state.loading ?
              <LoaderComponent Loading={this.state.loading} /> :
              <div className="row no-recipes">
                {
                  recipeList.length > 0 ?
                    recipeList.map(recipe =>
                      (<Recipe
                        recipe={recipe}
                        key={recipe.id}
                        deleteRecipe={this.onDeleteRecipe}
                        getAllRecipes={this.props.getRecipes}
                      />)) : (<h4 className="mt-5 text-center no-recipes-yet"> No recipes yet</h4>)
                }
              </div>
            }

          </div>
        </div>
        {recipeList.length > 0 && <ReactPaginate
          pageCount={pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={3}
          previousLabel="Previous"
          nextLabel="Next"
          breakClassName="text-center"
          initialPage={0}
          containerClassName="container pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item active"
          previousClassName="page-item"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          onPageChange={this.onPageChange}
        />}

        <FooterComponent />
      </div>
    );
  }
}


RecipePage.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  deleted: PropTypes.bool.isRequired,
  totalContent: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  totalContent: state.recipeReducer.totalContent,
  pages: state.recipeReducer.pages,
  errors: state.recipeReducer.error,
  deleted: state.recipeReducer.deleted
});

export default connect(
  mapStateToProps,
  {
    createRecipe, getRecipes, deleteRecipe, getRecipeDetail, editRecipe,
  },
)(RecipePage);
