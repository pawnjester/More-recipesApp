import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Loader } from '../../src/components/common/Loader';

configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<Loader />);
  return {
    shallowWrapper,
  };
};

describe('Test for Loader', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
