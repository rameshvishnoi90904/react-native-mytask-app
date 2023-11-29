module.exports = {
  preset: 'react-native',
  setupFiles: [
    "./jest/setup.js"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
};

