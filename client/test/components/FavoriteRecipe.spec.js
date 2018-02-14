import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { FavoriteRecipe } from '../../src/components/recipe/FavoriteRecipe';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  getFavoriteRecipe: jest.fn(),
  deleteFavorite: jest.fn(),
  favoriteRecipe: {
    id: 1,
    name: 'Rice',
    method: 'Boil the rice',
    upVotes: 1,
    downVotes: 0
  }
};

const setup = () => {
  const shallowWrapper = shallow(<FavoriteRecipe {...props}/> );
  return {
    shallowWrapper,
  }
};

describe('Favorite Recipe Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onDelete() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    const favoriteId = 1;
    shallowWrapper.instance().onDelete(favoriteId);
    expect(props.deleteFavorite.mock.calls.length).toEqual(1);
});
});

describe('onPageChange', () => {
  it('should work correctly', () => {
    sinon.spy(FavoriteRecipe.prototype, 'onPageChange');
    const props = {
      getFavoriteRecipe: jest.fn(),
      deleteFavorite: jest.fn(),
      favoriteRecipe: {
        id: 1,
        name: 'Rice',
        method: 'Boil the rice',
        upVotes: 1,
        downVotes: 0
      }
    };
    const selected = {
      data: 1
    };
    const shallowWrapper = shallow(<FavoriteRecipe {...props} store={store} />);
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getFavoriteRecipe).toBeCalled();
  });
});
