module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',  // Vue 文件转换器
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Babel 转换器
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ]
};
