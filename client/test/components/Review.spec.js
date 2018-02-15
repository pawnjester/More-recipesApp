import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { Reviews } from '../../src/components/recipe/Review';


configure({ adapter: new Adapter() });

const pageProps = {
  addReview: jest.fn(),
  recipeId: 1
};

const setup = () => {
  const props = {
    ...pageProps
  };
  return shallow(<Reviews {...props} />);
};

describe('Add Review Form Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const wrapper = setup();
    const event = {
      target: { name: 'data', value: 'nice meal' }
    };
    const inputForm = wrapper.find('.form-control');
    inputForm.simulate('change', event);
    expect(wrapper.instance().state.data).toBe('nice meal');
  });
});
describe('onSubmit', () => {
  it('be called when form is submitted', () => {
    sinon.spy(Reviews.prototype, 'onSubmit');
    const wrapper = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        data: 'this meal is nice'
      }
    };
    const form = wrapper.find('.add-review-btn');
    form.simulate('submit', event);
    wrapper.setState({ data: 'great' });
    wrapper.instance().onSubmit(event);
    expect(Reviews.prototype.onSubmit.calledOnce).toEqual(true);
  });
});
