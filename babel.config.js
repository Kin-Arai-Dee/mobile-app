module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
            constants: './src/state/constants',
            contexts: './src/state/contexts',
            hooks: './src/hooks',
            data: './src/data',
            images: './src/images',
            mocks: './src/mock',
          },
        },
      ],
    ],
  }
}
