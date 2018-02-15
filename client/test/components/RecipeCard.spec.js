import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { RecipeCard } from '../../src/components/recipe/RecipeCard';


configure({ adapter: new Adapter() });


const props = {
  recipe: {
    id: 1,
    name: 'Rice'
  },
};

const setup = () => {
  const shallowWrapper = shallow(<RecipeCard {...props} />);
  return {
    shallowWrapper,
  };
};


describe('RecipeCard Component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});
