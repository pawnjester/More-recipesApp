import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import sinon from 'sinon';
import { provider } from 'react-redux';
import { DisplayReview } from '../../src/components/recipe/DisplayReviews';
import store from '../../src/store/store';

configure({ adapter: new Adapter() });

const match = {
  params: {
    recipeId: 1
  }
};

const setup = () => {
  const props = {
    deleteReview: jest.fn(),
    userDetail: { id: 1 },
    Review:
      {User: {
        profileImg: 'pic.jpg',
        id: 1
    }},
    match
  }
  const wrapper = shallow(<DisplayReview {...props} />)
  return {
    wrapper,
    props
  }
}

describe('Display Reviews Component', () => {
  it('should render correctly', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot()
  });

  it('should delete reviews', () => {
    const {wrapper} = setup();
    wrapper.find('.delete-review-id').simulate('click');
  })
});
