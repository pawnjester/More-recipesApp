import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Recipe } from '../../src/components/recipe/addRecipe/Recipe';


configure({ adapter: new Adapter() });

const match = {
  params: {
    recipeId: 1
  }
};

const props = {
  recipe: {
    id: 1,
    name: 'Rice'
  },
  deleteRecipe: jest.fn(),
  match
};


const setup = () => {
  const shallowWrapper = shallow(<Recipe {...props} />);
  return {
    shallowWrapper,
  };
};


describe('Recipe Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('toggle() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().toggle();
  });
});

describe('onDelete() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().onDelete();
  });
});
