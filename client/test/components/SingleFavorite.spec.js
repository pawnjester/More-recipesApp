import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { SingleFavorite } from '../../src/components/recipe/SingleFavorite';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  searchRecipe: jest.fn(),
  deleteFavorite: jest.fn(),
  recipe: { name},
  favoriteId: 1
}

function setup() {
  const shallowWrapper = shallow(<SingleFavorite {...props}/> );
  return {
    shallowWrapper,
  }
}
describe('Test for Single Favorite Recipes', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onDelete function', () => {
  it('work when clicked', () => {
    const shallowWrapper = shallow(<SingleFavorite {...props} />);
    sinon.spy(SingleFavorite.prototype, 'onDelete');
    expect(shallowWrapper).toMatchSnapshot();
  });
});
