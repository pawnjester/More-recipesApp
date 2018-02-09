import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { SearchPage } from '../../src/components/SearchPage';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


configure({ adapter: new Adapter() });

const props = {
  search: jest.fn()
}
const setup = () => {
  const shallowWrapper = shallow(<SearchPage {...props} />);
  return {
    shallowWrapper,
  };
}
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
