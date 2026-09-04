const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    extraNodeModules: {
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
