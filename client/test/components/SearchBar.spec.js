import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SearchBar } from '../../src/components/SearchBar';

configure({ adapter: new Adapter() });

const props = {
  searchRecipe: jest.fn(),
};

const setup = () => {
  const shallowWrapper = shallow(<SearchBar {...props} />);
  return {
    shallowWrapper,
  };
};
describe('Search bar', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'search', value: 'phil' }
    };
    const inputForm = shallowWrapper.find('input');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.search).toBe('phil');
  });
});
