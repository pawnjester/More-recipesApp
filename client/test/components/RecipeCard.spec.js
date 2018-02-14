import React from 'React';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { RecipeCard } from '../../src/components/recipe/RecipeCard';
import store from '../../src/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';


configure({ adapter: new Adapter() });


const props = {
  recipe: {
    id: 1,
    name: 'Rice'
  },
};

function setup() {
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
