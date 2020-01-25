module.exports = api => {
  const isDevelopment = api.env() === 'development';
  const isTest = api.env() === 'test';

  const presets = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        development: isDevelopment || isTest,
        useBuiltIns: true,
      },
    ],
  ];

  const plugins = ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'];

  if (!isTest) {
    plugins.push([
      'babel-plugin-jsx-remove-data-test-id',
      {
        attributes: 'data-testid',
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
