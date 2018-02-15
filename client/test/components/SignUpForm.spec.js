import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SignUpForm } from '../../src/components/signup/SignUpForm';

configure({ adapter: new Adapter() });

const props = {
  userSignupRequest: jest.fn(() => Promise.resolve())
};
const setup = () => {
  const shallowWrapper = shallow(<SignUpForm {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Sign Up Form', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'username', value: 'randomxxcom' }
    };
    const inputForm = shallowWrapper.find('#username-field');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.username).toBe('randomxxcom');
  });
});

describe('onSubmit() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.setState({
      username: 'kjdjkskjsd',
      email: 'kjfdkj@exa.com',
      password: 'jhdjsdkjds',
      passwordConfirmation: 'jhdjsdkjds',
    });
    shallowWrapper.instance().onSubmit(event);
    expect(props.userSignupRequest.mock.calls.length).toEqual(1);
  });
});
