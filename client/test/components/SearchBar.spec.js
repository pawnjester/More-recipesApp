import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { searchBar } from '../../src/components/SearchBar';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  searchRecipe: jest.fn()
}

function setup() {
  const shallowWrapper = shallow(<searchBar {...props}/> );
  return {
    shallowWrapper,
  }
}
describe('Test for Search bar', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

// describe('onChange() should', () => {
//   it('be called when form input changes', () => {
//     const { shallowWrapper } = setup();
//     const event = {
//       target: { name: 'search', value: 'phil' }
//     };
//     const inputForm = shallowWrapper.find('.searchbars');
//     inputForm.simulate('change', event);
//     expect(shallowWrapper.instance().state.search).toBe('phil');
//   });
// });
