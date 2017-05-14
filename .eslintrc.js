module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': ['error', {
     extensions: ['.js'],
   }],
  }
}
