module.exports = {
  root: true, // 根目录配置，子项目无需重复设置 root: true
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier' // 关闭与 Prettier 冲突的规则
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true
  },
  settings: {
    react: { version: 'detect' } // 自动检测 React 版本
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+ 无需引入 React
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};