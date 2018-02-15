import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { PasswordChangeForm } from '../../src/components/PasswordChangeForm';


configure({ adapter: new Adapter() });

const props = {
  match: {
    params: {
      token: jwt.sign({ name: 'racingplane' }, 'flavooor', { expiresIn: 86400 })
    }
  },
  resetPassword: jest.fn(() => Promise.resolve())
};
const setup = () => {
  const shallowWrapper = shallow(<PasswordChangeForm {...props} />);
  return {
    shallowWrapper,
  };
};
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

describe('onSubmit', () => {
  it('should submit if passwords match', () => {
    sinon.spy(PasswordChangeForm.prototype, 'onSubmit');
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
      target: {
        password: 'andela',
        passwordConfirmation: 'andela'
      }
    };
    const form = shallowWrapper.find('.password-color');
    form.simulate('submit', event);
    shallowWrapper.setState({
      password: 'andela',
      passwordConfirmation: 'andela',
      errors: {}
    });
    shallowWrapper.instance().onSubmit(event);
    expect(PasswordChangeForm.prototype.onSubmit.calledOnce).toEqual(true);
  });
});
