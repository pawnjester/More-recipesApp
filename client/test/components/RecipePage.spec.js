import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { RecipePage } from '../../src/components/recipe/addRecipe/RecipePage';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });


const props = {
  createRecipe: jest.fn(),
  getRecipes: jest.fn(() => Promise.resolve()),
  deleteRecipe: jest.fn(),
  getRecipeDetail: jest.fn(),
  editRecipe: jest.fn(),
  recipes: [],
  errors: {},
  totalContent: 3,
  deleted: true
};
const setup = () => {
  const shallowWrapper = shallow(<RecipePage {...props}/> );
  return {
    shallowWrapper,
  }
};

describe('RecipePage Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onPageChange', () => {
  it('should work correctly', () => {
    sinon.spy(RecipePage.prototype, 'onPageChange');
    const props = {
      createRecipe: jest.fn(),
      getRecipes: jest.fn(() => Promise.resolve()),
      deleteRecipe: jest.fn(),
      getRecipeDetail: jest.fn(),
      editRecipe: jest.fn(),
      recipes: [],
      errors: {},
      totalContent: 3,
      deleted: true
    };
    const selected = {
      data: 1
    };
    const shallowWrapper = shallow(<RecipePage {...props} store={store} />);
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getRecipes).toBeCalled();
  });
});

describe('onDeleteRecipe should', () => {
  it('be called when delete button is clicked', () => {
    const { shallowWrapper } = setup();
    const recipeId = 1;
    shallowWrapper.instance().onDeleteRecipe(recipeId);
    expect(props.deleteRecipe.mock.calls.length).toEqual(1);
});
});

describe('toggle should', () => {
  it('set modal state', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState({
      modal: true
    })
    shallowWrapper.instance().toggle();
});
});
