import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';

configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';

require.extensions['.css'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

global.expect = expect;
global.window = window;
global.shallow = shallow;
global.navigator = global.window.navigator;
global.$ = require('jquery');


global.document = window.document;
console.error = (message) => {
  throw new Error(message);
};
