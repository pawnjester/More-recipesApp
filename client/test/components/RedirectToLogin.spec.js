import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { RedirectToLogin } from '../../src/components/RedirectToLogin';


configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<RedirectToLogin />);
  return {
    shallowWrapper,
  };
};

describe('Redirect to Login Page', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
