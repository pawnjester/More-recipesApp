import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { provider } from 'react-redux';
import { changePasswordForm } from '../../src/components/changePasswordForm';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';


configure({ adapter: new Adapter() });

function setup() {
  const shallowWrapper = shallow(<changePasswordForm  />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <changePasswordForm store={store} />
      </BrowserRouter>
    </Provider>
  );
  return {
    shallowWrapper,
    mountedWrapper
  };
}
describe('Test For change Password Form', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  })
})
