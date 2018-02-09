import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { TextFieldGroup } from '../../src/components/common/TextFieldGroup';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  field: '',
  value: '',
  error: '',
  type: '',
  onChange: jest.fn(),
  placeholder: '',
}

function setup() {
  const shallowWrapper = shallow(<TextFieldGroup {...props} /> );
  return {
    shallowWrapper,
  }
}

describe('Test for TextFieldGroup', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
