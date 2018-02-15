import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { EditRecipeModal } from '../../src/components/Modal/EditRecipeModal';

configure({ adapter: new Adapter() });

const props = {
  editRecipe: jest.fn(),
  getAllRecipes: jest.fn(),
  toggle: jest.fn(),
  Recipe: {}
};
const setup = () => {
  const shallowWrapper = shallow(<EditRecipeModal {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Test for Edit Recipe Modal', () => {
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
    const inputForm = shallowWrapper.find('.out');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.name).toBe('phil');
  });
});

describe('onSubmit() should', () => {
  it('be called when form is submitted', () => {
    const wrapper = shallow(<EditRecipeModal {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.edit-button-recipe');
    wrapper.setState({
      name: 'randomrecipe', ingredients: 'random', method: 'randommethod', imageUrl: 'random.jpg'
    });
    form.simulate('click', event);
    expect(wrapper.instance().state.name).toBe('randomrecipe');
  });
});
