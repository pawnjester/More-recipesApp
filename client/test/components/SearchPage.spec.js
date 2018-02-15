import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SearchPage } from '../../src/components/SearchPage';


configure({ adapter: new Adapter() });

const props = {
  search: jest.fn()
};
const setup = () => {
  const shallowWrapper = shallow(<SearchPage {...props} />);
  return {
    shallowWrapper,
  };
};
describe('Test For reset Password Form', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'search', value: 'Rice' }
    };
    const inputForm = shallowWrapper.find('.search-input-bar');
    inputForm.simulate('change', event);
  });
});
