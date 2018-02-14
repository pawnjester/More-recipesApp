import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { ChangePasswordForm } from '../../src/components/changePasswordForm';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';


configure({ adapter: new Adapter() });

const props = {
  changePassword: jest.fn(() => Promise.resolve()),
  errors: {}
}
const setup = () => {
  const shallowWrapper = shallow(<ChangePasswordForm {...props} />);
  return {
    shallowWrapper,
  };
}
describe('Change Password Form', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onNameChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'oldPassword', value: 'randomxxcom' }
    };
    const inputForm = shallowWrapper.find('.old-password-input');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.oldPassword).toBe('randomxxcom');
  });
});

describe('onSubmit', () => {
  it('submit the form', () => {
    const wrapper = shallow(<ChangePasswordForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        oldPassword: 'andela001',
        password: 'andela234'
      }
    };
    const form = wrapper.find('.password-color');
    wrapper.setState({ oldPassword: 'andela001',
      password: 'andela234' });
    form.simulate('click', event);
    expect(wrapper.instance().state.oldPassword).toEqual('andela001');
  });
});
