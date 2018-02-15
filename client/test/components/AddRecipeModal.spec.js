import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { AddRecipeModal } from '../../src/components/Modal/AddRecipeModal';

configure({ adapter: new Adapter() });

const props = {
  createRecipe: jest.fn(() => Promise.resolve()),
  errors: {},
  getRecipe: jest.fn(),
  currentPage: 1
};

const setup = () => {
  const shallowWrapper = shallow(<AddRecipeModal {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Test for Add Recipe Modal', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'name', value: 'phil' }
    };
    const inputForm = shallowWrapper.find('.name-field');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.name).toBe('phil');
  });
});

describe('onSubmit() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.setState({
      name: 'Rice stew',
      ingredients: 'rice, beans',
      method: 'Boil the rice',
      imageUrl: 'pic.jpg',
      cookingTime: '1',
      option: 'minutes'
    });
    shallowWrapper.instance().onSubmit(event);
    expect(props.createRecipe.mock.calls.length).toEqual(1);
  });
});
