const path = require('path');

const config = {
  framework: '@storybook/nextjs',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    // Use the same PostCSS config as your project
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};

export default config;
