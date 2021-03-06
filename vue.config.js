module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Асоціація "Газові трейдери України"'
    }
  },

  lintOnSave: true,

  devServer: {
    port: 4001
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
};
