module.exports = {
  presets: [`module:@react-native/babel-preset`, `nativewind/babel`],
  plugins: [
    `react-native-reanimated/plugin`,
    [
      `module-resolver`,
      {
        root: [`./src`],
        extensions: [
          `.ios.ts`,
          `.android.ts`,
          `.ts`,
          `.ios.tsx`,
          `.android.tsx`,
          `.jsx`,
          `.js`,
          `.json`,
        ],
        alias: {
          '@/app': `./src/app`,
          '@/assets': `./src/assets`,
          '@/commons': `./src/commons`,
          '@/components': `./src/components`,
          '@/hooks': `./src/hooks`,
          '@/endpoints': `./src/endpoints`,
          '@/routers': `./src/routers`,
          '@/lib': `./src/lib`,
        },
      },
    ],
  ],
};
