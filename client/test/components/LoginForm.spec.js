import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { LoginForm } from '../../src/components/login/loginForm';


configure({ adapter: new Adapter() });

const props = {
  login: jest.fn(() => Promise.resolve())
};

const setup = () => {
  const shallowWrapper = shallow(<LoginForm {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Login Form Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onSubmit() should', () => {
  it('be called when form is submitted', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.setState({
      identifier: 'ebuke@example.com',
      password: 'chalrsss',
    });
    shallowWrapper.instance().onSubmit(event);
    expect(props.login.mock.calls.length).toEqual(1);
});
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'identifier', value: 'phil' }
    };
    shallowWrapper.instance().onChange(event);
  });
});
