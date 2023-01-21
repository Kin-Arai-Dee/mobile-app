module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            config: './src/config',
            navigations: './src/navigations',
            utils: './src/utils',
            actions: './src/state/actions',
            contexts: './src/contexts',
            hooks: './src/hooks',
            data: './src/data',
            images: './src/images',
            mock: './src/mock',
            constants: './src/constants',
            services: './src/services',
            cores: './src/cores',
          },
        },
      ],
    ],
  }
}
