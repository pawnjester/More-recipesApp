import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import NotFound from '../../src/components/NotFound';
import store from '../../src/store/store';


configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<NotFound />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <NotFound store={store} />
      </BrowserRouter>
    </Provider>);
  return {
    shallowWrapper,
    mountedWrapper
  };
};
describe('Test For Not Found', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
});
