import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { TextFieldGroup } from '../../src/components/common/TextFieldGroup';

configure({ adapter: new Adapter() });

const props = {
  field: '',
  value: '',
  error: '',
  type: '',
  onChange: jest.fn(),
  placeholder: '',
};

const setup = () => {
  const shallowWrapper = shallow(<TextFieldGroup {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Test for TextFieldGroup', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
