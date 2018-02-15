import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';

import { NavigationBar } from '../../src/components/NavigationBar';


configure({ adapter: new Adapter() });

const props = {
  logout: jest.fn(),
  getUserDetail: jest.fn(),
  userDetail: {
    id: 1,
    username: 'Emmanuel',
    email: 'emma@example.com'
  },
  auth: {
    isAuthenticated: true
  }
};

const setup = () => {
  const shallowWrapper = shallow(<NavigationBar {...props} />);
  return {
    shallowWrapper,
  };
}

describe('Navigation Bar', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('Logout function', () => {
  it('should render correctly when called', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.instance().logout(event);
    expect(props.logout.mock.calls.length).toEqual(1);
  });
});
