import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { Detail } from '../../src/components/recipe/Detail';
import store from '../../src/store/store';


configure({ adapter: new Adapter() });

const pageProps = {
  getRecipeDetail: jest.fn(),
  getReview: jest.fn(),
  upvoteRecipe: jest.fn(),
  downvoteRecipe: jest.fn(),
  favoriteRecipe: jest.fn(() => Promise.resolve()),
  getUserDetail: jest.fn(),
  deleteReview: jest.fn(),
};

const upvoteSpy = jest.spyOn(pageProps, 'upvoteRecipe');
const downvoteSpy = jest.spyOn(pageProps, 'downvoteRecipe');
const favoriteSpy = jest.spyOn(pageProps, 'favoriteRecipe');

const singleRecipe = {
  id: '1',
  name: 'rice',
  ingredients: 'beans',
  method: 'dry the maize',
  viewCount: 1,
  upVotes: 1,
  downVotes: 0,
  cookingTime: 30,
  imageUrl: 'pic.jpg'
};
const message = { message: 'You just favorited this recipe' };

const userDetail = {
  id: 1,
  username: 'charles'
};
const match = {
  params: {
    recipeId: 1
  }
}
const setup = (favoriteStatus = false) => {
  const props = {
    singleRecipe,
    message,
    userDetail,
    favoriteStatus,
    match,
    ...pageProps
  }
  return shallow(<Detail {...props}/> )
};

describe('Recipe detail Component', () => {
  it('should render correctly', () => {
    const wrapper  = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow user upvote recipe', () => {
    const wrapper = setup();
    wrapper.find('.upvote-btn').simulate('click');
    expect(upvoteSpy).toHaveBeenCalledWith(match.params.recipeId)
  });

  it('should allow user downvote recipe', () => {
    const wrapper = setup();
    wrapper.find('.downvote-btn').simulate('click');
    expect(downvoteSpy).toHaveBeenCalledWith(match.params.recipeId)
  });

  it('should allow user favorite recipe', () => {
    const wrapper = setup();
    wrapper.find('.favorite-btn').simulate('click');
    expect(favoriteSpy).toHaveBeenCalledWith(match.params.recipeId)
  });
});
