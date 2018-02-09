import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { App } from '../../src/components/App';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<App />);
  return {
    shallowWrapper,
  };
};

describe('App Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
