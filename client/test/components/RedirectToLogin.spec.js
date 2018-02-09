import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { RedirectToLogin } from '../../src/components/RedirectToLogin';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';


configure({ adapter: new Adapter() });

const setup = () => {
  const shallowWrapper = shallow(<RedirectToLogin />);
  return {
    shallowWrapper,
  };
};

describe('Redirect to Login Page', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
