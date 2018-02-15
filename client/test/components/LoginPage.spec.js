import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { LoginPage } from '../../src/components/login/LoginPage';

configure({ adapter: new Adapter() });

const props = {
  login: jest.fn()
};


const setup = () => {
  const shallowWrapper = shallow(<LoginPage {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Login Page', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
