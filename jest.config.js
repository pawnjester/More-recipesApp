module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/server/',
    '/client/js/tests/mocks',
    '/client/test/setup.js',
    '/client/src/Index.jsx',
    '/client/src/components/validations',
    '/client/public/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'client',
  roots: ['<rootDir>/'],
  setupFiles: [
    '<rootDir>/test/setup.js',
    '<rootDir>/test/__mocks__/localStorageMock.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(scss|css)$': 'identity-obj-proxy'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
