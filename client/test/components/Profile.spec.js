import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Profile } from '../../src/components/user/profile';


configure({ adapter: new Adapter() });

const props = {
  getUserDetail: jest.fn(),
  userDetail: {
    id: 1,
    username: 'charles',
    email: 'charles@example.com'
  },
  errors: {}
};

const setup = () => {
  const shallowWrapper = shallow(<Profile {...props} />);
  return {
    shallowWrapper,
  };
};

describe('User Profile Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
