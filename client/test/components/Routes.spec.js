import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Routes from '../../src//components/Routes';


configure({ adapter: new Adapter() });

describe('Test For Routes', () => {
  it('should test for routes', () => {
    const wrapper = shallow(<Routes /> );
    expect(wrapper).toMatchSnapshot()
  })

})
