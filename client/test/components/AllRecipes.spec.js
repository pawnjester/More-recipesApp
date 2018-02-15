import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { AllRecipes } from '../../src/components/recipe/AllRecipes';

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
    const selected = {
      data: 1
    };
    const { shallowWrapper } = setup();
    shallowWrapper.instance().onPageChange(selected);
    expect(shallowWrapper.instance().props.getAllRecipes).toBeCalled();
  });
});
