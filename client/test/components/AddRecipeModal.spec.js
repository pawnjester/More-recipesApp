import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { AddRecipeModal } from '../../src/components/Modal/AddRecipeModal';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

function setup() {
  const shallowWrapper = shallow(<AddRecipeModal /> );
  return {
    shallowWrapper,
  }
}

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
    const wrapper = shallow(<AddRecipeModal /> )
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.add-recipe-button');
    wrapper.setState({ name: 'randomrecipe', ingredients: 'random', method: 'randommethod', imageUrl: 'random.jpg' });
    form.simulate('click', event);
    expect(wrapper.instance().state.name).toBe('randomrecipe');
});
});
