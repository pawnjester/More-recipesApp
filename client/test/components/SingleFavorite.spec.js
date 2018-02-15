import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SingleFavorite } from '../../src/components/recipe/SingleFavorite';

configure({ adapter: new Adapter() });

const props = {
  searchRecipe: jest.fn(),
  deleteFavorite: jest.fn(),
  recipe: { name: '' },
  favoriteId: 1
};

const setup = () => {
  const shallowWrapper = shallow(<SingleFavorite {...props} />);
  return {
    shallowWrapper,
  };
};
describe('Test for Single Favorite Recipes', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onDelete function should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().onDelete();
    shallowWrapper.find('.delete').simulate('click');
  });
});
