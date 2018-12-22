module.exports = {
  'env': {
    'jest': true,
    'browser': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'settings': {
    'react': {
      'createClass': 'createReactClass',
      'pragma': 'React',
      'version': '16.6.3',
      'flowVersion': '0.53'
    },
    'propWrapperFunctions': [
        'forbidExtraProps',
        {'property': 'freeze', 'object': 'Object'},
        {'property': 'myFavoriteWrapper'}
    ]
  }
};
