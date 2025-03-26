module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // Specify the module name for importing environment variables
        path: '.env', // The location of your .env file
      },
    ],
  ],
};
