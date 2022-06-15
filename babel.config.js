
module.exports = function (api) {
  const esm = api.env(['esm']);

  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        modules: esm ? false : 'commonjs'
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
  ];

  return {
    presets,
    plugins,
  };
};
