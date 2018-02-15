import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SignUpPage } from '../../src/components/signup/SignUpPage';

configure({ adapter: new Adapter() });

const props = {
  userSignupRequest: jest.fn()
};

const setup = () => {
  const shallowWrapper = shallow(<SignUpPage {...props} />);
  return {
    shallowWrapper,
  };
};

describe('SignUp Page', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
