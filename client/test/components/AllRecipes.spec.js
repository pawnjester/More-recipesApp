import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { AllRecipes } from '../../src/components/recipe/AllRecipes';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });


const props = {
  getAllRecipes: jest.fn(() => Promise.resolve()),
  allRecipes: {
    recipes: {}
  }
};
const setup = () => {
  const shallowWrapper = shallow(<AllRecipes {...props}/> );
  return {
    shallowWrapper,
  }
};

describe('All Recipe Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onPageChange', () => {
  it('should work correctly', () => {
    sinon.spy(AllRecipes.prototype, 'onPageChange');
    const props = {
      getAllRecipes: jest.fn(() => Promise.resolve()),
      allRecipes: {
      recipes: {}
  }
    };
    const selected = {
      data: 1
    };
    const shallowWrapper = shallow(<AllRecipes {...props} store={store} />);
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getAllRecipes).toBeCalled();
  });
});
