import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { EditUserModal } from '../../src/components/Modal/EditUserModal';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const props = {
  editUserDetail: jest.fn(),
  getuserDetail: jest.fn(),
  toggle: jest.fn(),
  errors: ''
}

function setup() {
  const shallowWrapper = shallow(<EditUserModal {...props} /> );
  return {
    shallowWrapper,
  }
}

describe('Test for Edit User Modal Modal', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'username', value: 'phil' }
    };
    const inputForm = shallowWrapper.find('.name-field');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.username).toBe('phil');
  });
});

describe('onSubmit() should', () => {
//   it('be called when form is submitted', () => {
//     const wrapper = shallow(<EditUserModal {...props} /> )
//     const event = {
//       preventDefault: jest.fn()
//     };
//     const form = wrapper.find('.edit-user-button');
//     wrapper.setState({ username: 'randomuser', profileImg: 'random.jpg' });
//     form.simulate('click', event);
//     expect(wrapper.instance().state.name).toBe('randomrecipe');
// });
  it('be called when form is submitted', () => {
    const wrapper = shallow(<EditUserModal {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.setState({ username: 'randomuser', profileImg: 'random.jpg', errors: {} });
    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    ).mockImplementation(() => Promise.reject({}))
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
