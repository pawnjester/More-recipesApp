import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { UpvotedRecipes } from '../../src/components/UpvotedRecipes';

configure({ adapter: new Adapter() });

const props = {
  recipe: {
    name: ''
  }
};
const setup = () => {
  const shallowWrapper = shallow(<UpvotedRecipes {...props} />);
  return {
    shallowWrapper,
  };
};


describe('Upvoted Recipes Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
