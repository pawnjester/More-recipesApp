import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';

configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';

// // Register babel so that it will transpile ES6 to ES5
// // before our tests run.
// require('babel-register')();

// // Disable webpack-specific features for tests since
// // Mocha doesn't know what to do with them.
require.extensions['.css'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

global.expect = expect;
global.window = window;
global.shallow = shallow;
global.navigator = global.window.navigator;
global.$ = require('jquery');

// global.localStorage = localStorageMock;


global.document = window.document;
console.error = message => {
  throw new Error(message);
}
// global.navigator = {
//   userAgent: 'node.js',
// };
// copyProps(window, global);
