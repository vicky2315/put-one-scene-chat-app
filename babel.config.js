module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // Specify the module name for importing environment variables
        path: '.env', // The location of your .env file
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ts', '.tsx', '.jsx'],

        alias: {
          '@': './',
          'tailwind.config': './tailwind.config.js',
        },
      },
    ],

    ['@babel/plugin-proposal-decorators', {legacy: true}],
    'react-native-reanimated/plugin',
  ],
};
