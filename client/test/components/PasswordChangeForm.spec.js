import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { PasswordChangeForm } from '../../src/components/PasswordChangeForm';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


configure({ adapter: new Adapter() });

const props = {
  resetPassword: jest.fn()
}
function setup() {
  const shallowWrapper = shallow(<PasswordChangeForm {...props} />);
  return {
    shallowWrapper,
  };
}
describe('Test For change Password Form', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'password', value: 'randomxxcom' }
    };
    const inputForm = shallowWrapper.find('.password');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.password).toBe('randomxxcom');
  });
});
// describe('onSubmit', () => {
//   it('should not work for invalid email', () => {
//     const wrapper = shallow(<PasswordChangeForm {...props} />)
//     const event = {
//       preventDefault: jest.fn();
//       const form = wrapper.find('.password-color');
//       wrapper.setState({ email: ''});
//       form.simulate('click', event);
//     }
//   })
// })
