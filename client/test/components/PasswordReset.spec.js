import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { PasswordReset } from '../../src/components/PasswordReset';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


configure({ adapter: new Adapter() });

const props = {
  checkEmail: jest.fn(() => Promise.resolve())
}
const setup = () => {
  const shallowWrapper = shallow(<PasswordReset {...props} />);
  return {
    shallowWrapper,
  };
}
describe('Reset Password Form', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'email', value: 'email@example.com' }
    };
    const inputForm = shallowWrapper.find('.out');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.email).toBe('email@example.com');
  });
});

describe('onSubmit() should', () => {
  it('not work for invalid email', () => {
    const wrapper = shallow(<PasswordReset {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.reset-button');
    wrapper.setState({ email: '' });
    form.simulate('click', event);
    expect(wrapper.instance().state.errors).toEqual({ email: 'Please enter an email address' });
  });
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.setState({ email: 'random@email.com', errors: {} });
    shallowWrapper.instance().onSubmit(event);
    expect(props.checkEmail.mock.calls.length).toEqual(1);
});
});
