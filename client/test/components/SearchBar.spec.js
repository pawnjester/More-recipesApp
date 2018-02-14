import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { SearchBar } from '../../src/components/SearchBar';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  searchRecipe: jest.fn(),
}

const setup = () => {
  const shallowWrapper = shallow(<SearchBar {...props}/> );
  return {
    shallowWrapper,
  }
}
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

// describe('onFocus should', () => {
//   it('redirect to another page', () => {
//     sinon.spy(SearchBar.prototype, 'onFocus');
//     const { shallowWrapper } = setup();
//     const searchField = shallowWrapper.find('#search-bar');
//     searchField.simulate('focus');
//     expect(SearchBar.prototype.onFocus.calledOnce).toEqual(true);
//   });
// });
