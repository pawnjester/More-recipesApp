import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Footer } from '../../src/components/common/Footer';

configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<Footer />);
  return {
    shallowWrapper,
  };
};

describe('Test for Footer', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
