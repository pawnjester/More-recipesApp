import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { Loader } from '../../src/components/common/Loader';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

function setup() {
  const shallowWrapper = shallow(<Loader /> );
  return {
    shallowWrapper,
  }
}

describe('Test for Loader', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
