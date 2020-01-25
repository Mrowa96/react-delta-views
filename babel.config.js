module.exports = api => {
  const isTest = api.env() === 'test';

  const presets = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        development: isTest,
        useBuiltIns: true,
      },
    ],
  ];

  const plugins = ['@babel/plugin-transform-runtime'];

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
