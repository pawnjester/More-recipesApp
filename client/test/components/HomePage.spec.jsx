import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Home } from '../../src/components/Homepage';


configure({ adapter: new Adapter() });

const props = {
  userSignupRequest: jest.fn(),
  getFavoriteRecipe: jest.fn(),
  getUpvotedRecipes: jest.fn(),
  getMostFavoriteRecipe: jest.fn(),
  auth: {},
  favoriteRecipe: {},
  mostFavoriteRecipe: []
};
const setup = () => {
  const shallowWrapper = shallow(<Home {...props} />);
  return {
    shallowWrapper,
  };
};

describe('HomePage Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setProps({
      upvotedRecipes: [
        {
          id: 1,
          name: 'Rice'
        },
        {
          id: 2,
          name: 'Yam'
        }
      ]
    });
    expect(shallowWrapper).toMatchSnapshot();
  });
});
